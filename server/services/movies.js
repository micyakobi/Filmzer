const Movies = require('../models/movies');

const createMovie = async (body) => {
    const movie = new Movies({
        title: body.title,
        year: body.year,
        genre: body.genre,  // delimiter ','
        description: body.description,
        image_url: body.image_url,
        trailer_video: body.trailer_video
    });
    return await movie.save();
};

const getMovies = async () => {
    return Movies.aggregate([
        {
            $lookup:
                {
                    from:"reviews",
                    localField:"reviews",
                    foreignField: "_id",
                    as: "rating_review"
                }
        },
        {
            $project:
                {
                    '_id':1,
                    'title':2,
                    'year':3,
                    'genre':4,
                    'description':5,
                    'image_url':6,
                    'trailer_video':7,
                    'rating_review.rating':8,
                }
        }])
};


const avgRatingByYear = async () => {
     return Movies.aggregate([
        {
            $lookup:
                {
                    from:"reviews",
                    localField:"reviews",
                    foreignField: "_id",
                    as: "rating_review"
                }
        },
         {
             $unwind:"$rating_review"
         },
         {
             $project:
                 {
                     "_id": 0,
                     "year": 1,
                     "rating_review.rating": 2
                 }
         }
        ]);
};


const countMovies = async () => {
    return await Movies.countDocuments({})
};


const countByGenre = async () => {
    return Movies.aggregate([
        {
            $group: {
                _id: "$genre",
                count: {$sum: 1}
            }
        },
        {
            $sort: {count:-1}
        },
        {
            $limit:6
        }
    ]);
};


const moviesByGenre = async () => {
    return Movies.aggregate([
        {
            $group: {
                _id: "$genre",
                movies: { $push: "$title" }
            }
        }
    ]);
};


const topMoviesByRating = async (topNumber) => {

    var query = [
        { $lookup:
                {
                    from:"reviews",
                    localField:"reviews",
                    foreignField: "_id",
                    as: "rating_review"
                }
        },
        {
            $project:
                {
                    "_id": 1,
                    "title": 2,
                    "year": 3,
                    "genre": 4,
                    "description": 5,
                    "image_url":6,
                    "trailer_video":7,
                    "rating_review.rating": {$avg: "$rating_review.rating"}
                }
        },
        {
            $project:
                {
                    "_id": 1,
                    "title": 2,
                    "year": 3,
                    "genre": 4,
                    "description": 5,
                    "image_url":6,
                    "trailer_video":7,
                    "rating_review": { $slice: [ "$rating_review", 1 ] }

                }
        },
        {
            $sort:
                {
                    "rating_review.rating":-1
                }

        },
        {
            $limit:parseInt(topNumber)
        }
    ]

    
    return Movies.aggregate(query);
};


const getMovieByTitle = async (title) => {
    return await Movies.find({'title': {$regex: `.*${title}.*`, $options:'i'}});
};


const getMoviesByGenre = async (genre) => {
    return await Movies.find({'genre': {$regex: `.*${genre}.*`, $options:'i'}});
};


const getMovieById = async (id) => {
    return await Movies.findById(id);
};


const getReviewsByMovieId = async (id) => {
    return await Movies.findById(id,{'_id':0, 'reviews':1});
};


const getMovieByTitleGenreYear = async (title=null, genre=null, year=NaN) => {

    var match = {};

    if(title!==null){
        match["title"] = new RegExp(title,'i')
    }

    if(isNaN(year)!==true){
        match["year"] = {$eq:parseInt(year)};
    }

    if(genre!==null){
        match["genre"] = new RegExp(genre, 'i')
    }

    var query = [
        {
            $lookup:
                {
                    from:"reviews",
                    localField:"reviews",
                    foreignField: "_id",
                    as: "rating_review"
                }
        },
        {
            $project:
            {
                "_id": 1,
                "title": 2,
                "year": 3,
                "genre": 4,
                "description": 5,
                "image_url": 6,
                "trailer_video": 7,
                "rating_review.rating": {$avg: "$rating_review.rating"}
            }
        },
        {
            $project:
                {
                    "_id": 1,
                    "title": 2,
                    "year": 3,
                    "genre": 4,
                    "description": 5,
                    "image_url":6,
                    "trailer_video":7,
                    "rating_review": { $slice: [ "$rating_review", 1 ] }

                }
        },
        {
            $match:match
        }
    ]

    return Movies.aggregate(query);
};


const updateMovie = async (id, body) => {
    const movie = await getMovieById(id);
    if (!movie)
        return null;

    movie.title = body.title;
    movie.year = body.year;
    movie.genre = body.genre;
    movie.description = body.description;
    movie.image_url = body.image_url;
    movie.trailer_video = body.trailer_video;
    await movie.save();
    return movie;
};

const updateReviewOfMovie = async (id, review) => {

    const movie = await getMovieById(id);
    if (!movie)
        return null;

    if(!review)
        return null

    if(movie.reviews.indexOf(review._id) === -1){
        movie.reviews.push(review._id);
    }
    await movie.save();

    return movie;
};



const deleteMovie = async (id) => {
    const movie = await getMovieById(id);
    if (!movie)
        return null;

    await movie.remove();
    return movie;
};


const removeMovieReviews = async (review_ids) => {

    return Movies.update({},{$pull:{"reviews":{$in:review_ids}}},{multi:true});
};


module.exports = {
    createMovie,
    getMovies,
    getMovieByTitle,
    getMovieById,
    updateMovie,
    updateReviewOfMovie,
    deleteMovie,
    getMovieByTitleGenreYear,
    countMovies,
    topMoviesByRating,
    getReviewsByMovieId,
    getMoviesByGenre,
    countByGenre,
    avgRatingByYear,
    removeMovieReviews,
    moviesByGenre
    }