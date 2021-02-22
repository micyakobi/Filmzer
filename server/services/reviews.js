const Reviews = require('../models/reviews');
const serviceUser = require('../services/users');
const moviesService = require('../services/movies');


const createReview = async (body) => {

    const review = new Reviews({
        reviewTitle: body.reviewTitle,
        reviewContent: body.reviewContent,
        rating: body.rating,
        movies: body.movies,
        users: body.users
    });

    await serviceUser.updateReviewOfUser(body.users, review);
    await moviesService.updateReviewOfMovie(body.movies, review);

    if (body.lastUpdated)
        review.lastUpdated = body.lastUpdated;

    return await review.save();
};

const getReviews = async () => {
    return await Reviews.find({});
};


const getReviewsMoviesUsers = async (movieTitle=null, rating=NaN, userName=null) => {

    var match = {};

    if(movieTitle!==null){
        match["movie.title"] = new RegExp(movieTitle, 'i')
    }

    if(isNaN(rating)!==true){
        match["rating"] = {$eq:parseInt(rating)};
    }

    if(userName!==null){
        match["user.username"] = new RegExp(userName, 'i')
    }

    var query = [
        {
            $lookup:
                {
                    from: "movies",
                    localField: "movies",
                    foreignField: "_id",
                    as: "movie"
                }
        },
        {
            $unwind:"$movie"
        },
        {
            $lookup:
                {
                    from: "users",
                    localField: "users",
                    foreignField: "_id",
                    as: "user"
                }
        },
        {
            $unwind:"$user"
        },
        {
            $project:
                {
                    "_id": 1,
                    "reviewTitle": 2,
                    "reviewContent": 3,
                    "rating": 4,
                    "lastUpdated": 5,
                    "movie._id":6,
                    "movie.title": 7,
                    "movie.year": 8,
                    "movie.genre": 9,
                    "movie.description": 10,
                    "movie.image_url": 11,
                    "movie.trailer_video": 12,
                    "user._id":13,
                    "user.username": 14,
                    "user.firstName": 15,
                    "user.lastName": 16
                }
        },
        {
            $match:match
        }
    ]

    return Reviews.aggregate(query)};


const searchReview = async (title=null, rating=NaN, user=null) => {

    var match = {};

    if(title!==null){
        match["reviewTitle"] = new RegExp(title, 'i')
    }

    if(isNaN(rating)!==true){
        match["rating"] = {$eq:parseInt(rating)};
    }

    if(user!==null){
        match["user.username"] = new RegExp(user, 'i')
    }

    var query = [
        {
            $lookup:
                {
                    from: "movies",
                    localField: "movies",
                    foreignField: "_id",
                    as: "movie"
                }
        },
        {
            $unwind:"$movie"
        },
        {
            $lookup:
                {
                    from: "users",
                    localField: "users",
                    foreignField: "_id",
                    as: "user"
                }
        },
        {
            $unwind:"$user"
        },
        {
            $project:
                {
                    "_id": 1,
                    "reviewTitle": 2,
                    "reviewContent": 3,
                    "rating": 4,
                    "lastUpdated":5,
                    "user.username": 6,
                    "movie.title":7
                }
        },
        {
            $match:match
        }
    ]

    return await Reviews.aggregate(query)
};


const getReviewsByIds = async (review_ids) => {

    var query = [
        {
            $match: {
                "_id": {$in: review_ids}
            }
        },
        {
            $lookup:
                {
                    from: "users",
                    localField: "users",
                    foreignField: "_id",
                    as: "user"
                }
        },
        {
            $unwind:"$user"
        },
        {
            $project:
                {
                    "_id": 1,
                    "reviewTitle": 2,
                    "reviewContent": 3,
                    "rating": 4,
                    "user._id":5,
                    "user.username": 6,
                    "user.firstName": 7,
                    "user.lastName": 8
                }
        }
    ]
    return await Reviews.aggregate(query);
    // return await Reviews.find({'_id':{ $in:review_ids }});
};


const topReviewsByDate = async (topNumber) => {

    var query = [
        {
            $lookup:
                {
                    from: "movies",
                    localField: "movies",
                    foreignField: "_id",
                    as: "movie"
                }
        },
        {
            $unwind:"$movie"
        },
        {
            $lookup:
                {
                    from: "users",
                    localField: "users",
                    foreignField: "_id",
                    as: "user"
                }
        },
        {
            $unwind:"$user"
        },
        {
            $project:
                {
                    "_id": 1,
                    "reviewTitle": 2,
                    "reviewContent": 3,
                    "rating": 4,
                    "lastUpdated":5,
                    "movie._id":6,
                    "movie.title": 7,
                    "movie.year": 8,
                    "movie.genre": 9,
                    "movie.description": 10,
                    "movie.image_url": 11,
                    "movie.trailer_video": 12,
                    "user._id":13,
                    "user.username": 14,
                    "user.firstName": 15,
                    "user.lastName": 16
                }
        },
        {
            $sort:{
                'lastUpdated': -1
            }
        },
        {
            $limit:parseInt(topNumber)
        }
    ]

    return await Reviews.aggregate([query])
};


const countReviews = async () => {
    return await Reviews.countDocuments({});
};


const getReviewByMovieId = async (id) => {
    return await Reviews.find({'movies': [id]});
};


const getReviewByUserId = async (id) => {
    return await Reviews.find({'users': Object(id)},{'_id': 1});
};


const getReviewsByTitleRatingUsername = async (rating, title, username) => {
    return await Reviews.find({'rating': rating}).
        populate({path:'movies', match:{'title': {$regex: `.*${title}.*`}}}).
        populate({path:'users', match:{'username': username}}).exec();
};


const getReviewById = async (id) => {
    return await Reviews.findById(id);
};


const updateReview = async (id, body) => {
    const review = await getReviewById(id);
    if (!review)
        return null;

    review.reviewTitle = body.reviewTitle;
    review.reviewContent = body.reviewContent;
    review.rating = body.rating;

    await review.save();
    return review;
};


const deleteReview = async (id) => {
    const review = await getReviewById(id);
    if (!review)
        return null;

    await review.remove();
    return review;
};



module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
    getReviewByMovieId,
    getReviewByUserId,
    getReviewById,
    getReviewsByTitleRatingUsername,
    countReviews,
    topReviewsByDate,
    getReviewsByIds,
    getReviewsMoviesUsers,
    searchReview
}