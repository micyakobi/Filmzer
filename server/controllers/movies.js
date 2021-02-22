

const _ = require("lodash");
const moviesService = require('../services/movies');
const reviewsService = require('../services/reviews');
const userService = require('../services/users');
const scrapeService = require('../services/scraper');
const fs = require('fs');
const Papa = require('papaparse');

const createMovie = async (req, res) => {
    const newMovie = await moviesService.createMovie(req.body);
    res.json(newMovie);
};


const topMoviesByRating = async (req, res) => {

    var topNumber;

    if (!req.params.topNumber){
        topNumber = await moviesService.countMovies();
    }
    else{
        topNumber = req.params.topNumber;
    }

    const movies = await moviesService.topMoviesByRating(topNumber);
    
    res.json(calcRatingAvg(movies));
};


function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}


const getMovies = async (req, res) => {
    const movies = await moviesService.getMovies();

    movies.forEach(function (movieItem) {
        Object.defineProperty(movieItem, "rating_avg",
            Object.getOwnPropertyDescriptor(movieItem, "rating_review"));
        delete movieItem["rating_review"];

        var newArray = []
        movieItem["rating_avg"].forEach(function (arrayItem) {
            newArray.push(arrayItem['rating'])
        });
        movieItem["rating_avg"] = newArray

        movieItem["rating_avg"] = average = movieItem["rating_avg"].reduce(function (avg, value, _, { length }) {
            return roundToTwo(avg + value / length);
        }, 0);
    });

    res.json(movies);
};


const calcRatingAvg = (rating) => {
    rating.forEach(function (item) {

        Object.defineProperty(item, "rating_avg",
            Object.getOwnPropertyDescriptor(item, "rating_review"));
        delete item["rating_review"];

        if(item["rating_avg"].length){
            item["rating_avg"] = roundToTwo(item["rating_avg"][0]["rating"])
        }
        else{
            item["rating_avg"] = 0
        }
    });
    return rating;
};



const avgRatingByYear = async (req, res) => {
    const ratingByYears = await moviesService.avgRatingByYear();

    const avgRatingByYear = await avgRatingMapReduce(ratingByYears, 'year');

    res.json(avgRatingByYear);
};


const avgRatingMapReduce = async (obj, keyMap) => {

    var map = _.mapValues(_.groupBy(obj, keyMap),
        clist => clist.map(obj => _.omit(obj, keyMap)));

    var data = {};
    Object.keys(map).forEach(function(key) {
        var newArray = []
        map[key].forEach(function (arrayItem) {
            newArray.push(arrayItem['rating_review']['rating'])
        });
        data[key] = newArray
    });

    var reduce = []
    Object.keys(data).forEach(function (key){
        var avg_value = average = data[key].reduce(function (avg, value, _, { length }) {
            return avg + value / length;
        }, 0);
        reduce.push({'year':key, 'avg_count': roundToTwo(avg_value)})
    });

    return reduce
}


const countMovies = async (req, res) => {
    const movies = await moviesService.countMovies();
    res.json(movies);
};


const countByGenre = async (req, res) => {
    const genresCount = await moviesService.countByGenre();

    var newGenresCount = []
    Object.keys(genresCount).forEach(function(key) {
        newGenresCount.push({'genre': genresCount[key]['_id'], 'count': genresCount[key]['count']})
    });
    res.json(newGenresCount);
};


const moviesByGenre = async (req, res) => {
    const moviesByGenre = await moviesService.moviesByGenre();

    var newGenresCount = []
    Object.keys(moviesByGenre).forEach(function(key) {
        newGenresCount.push({'genre': moviesByGenre[key]['_id'], 'movies': moviesByGenre[key]['movies']})
    });
    res.json(newGenresCount);
};


const getMovieByTitle = async (req, res) => {
    const movie = await moviesService.getMovieByTitle(req.params.movieTitle);

    if (!movie) {
        return res.status(404).json({errors: ['Movie not found']});
    }

    res.json(movie);
};


const getMoviesByGenre = async (req, res) => {
    const movie = await moviesService.getMoviesByGenre(req.params.genre);

    if (!movie) {
        return res.status(404).json({errors: ['Movie not found']});
    }

    res.json(movie);
};


const getMovieById = async (req, res) => {
    const movie = await moviesService.getMovieById(req.params.movieId);
    if (!movie){
        return res.status(404).json({errors: ['Movie not found']});
    }

    res.json(movie);
};


const getMovieByTitleGenreYear = async (req, res) => {

    var [movieTitle, movieGenre, movieYear] = req.params.param.split('=');

    if(movieTitle === ''){
        movieTitle =  null
    }

    if(movieGenre === ''){
        movieGenre =  null
    }

    if(movieYear === ''){
        movieYear =  NaN
    }

    const movies = await moviesService.getMovieByTitleGenreYear(
        movieTitle, movieGenre, movieYear
    );
    if (!movies) {
        return res.status(404).json({errors: ['Movies are not found']});
    }
    else{
        res.json(calcRatingAvg(movies));
    }
};


const updateMovies = async (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "movies param are required",
        });
    }

    const movies = await moviesService.updateMovie(req.params.movieId, req.body);
    if (!movies) {
        return res.status(404).json({ errors: ['movies not found'] });
    }

    res.json(movies);
};



const deleteMovie = async (req, res) => {

    // remove movie reviews
    const review_ids = await moviesService.getReviewsByMovieId(req.params.movieId);
    review_ids["reviews"].forEach(function (reviewId) {
        const review = reviewsService.deleteReview(reviewId);
        if (!review){
            return res.status(404).json({ errors: ['review not found for deleted'] });
        }

    });


    // remove movie
    const movie = await moviesService.deleteMovie(req.params.movieId);
    if (!movie) {
        return res.status(404).json({ errors: ['movie not found'] });
    }


    // remove user reviews
    const user = userService.removeUserReviews(review_ids["reviews"]);

    if(user.nModified===0){
        return res.status(404).json({ errors: ['cant find review on users table to update'] });
    }


    res.send();
};


const scrapeMovies = async (req, res) => {
    const file = fs.createReadStream(req.params[0].split("=")[1]);
    var count = 0; // cache the running count
    Papa.parse(file, {
        step:function(result) {
            result.data.forEach(async function (imdbID) {
                var movie = await getMovie(imdbID);
                if(movie){
                    var newMovies = await moviesService.createMovie(movie);
                    return await newMovies;
                }
            });
        },
        complete: function(results, file) {
            console.log('parsing complete read', count, 'records.');
        }
    });
};


async function getMovie (imdbID)  {

    return new Promise((resolve,reject)=>{
        scrapeService.getMovie(imdbID)
            .then( response => resolve(response));
    });
}


module.exports = {
    createMovie,
    getMovies,
    getMovieByTitle,
    getMovieById,
    updateMovies,
    deleteMovie,
    getMovieByTitleGenreYear,
    countMovies,
    topMoviesByRating,
    getMoviesByGenre,
    countByGenre,
    avgRatingByYear,
    getMovie,
    moviesByGenre,
    scrapeMovies
}