const express = require('express');
const movieController = require('../controllers/movies');
var router = express.Router();


/**
 * Scrape movies from imdb website, google and trailer from API
 * Using imdbID for getting movie title, genre and year from imdb website,
 * Using movie title from getting image from google and trailer.
 * http://localhost:8080/movies/scrapeMovies/:file=path
 */
router.route('/scrapeMovies/*')
    .get(movieController.scrapeMovies);


/**
 * Find movies by movie title, movie genre, and movie year
 * param - title=genre=year
 * http://localhost:8080/movies/getMovieByParams/:param
 */
router.route('/getMovieByParams/:param')
    .get(movieController.getMovieByTitleGenreYear);


/**
 * Get movies by genre
 * http://localhost:8080/movies/getMoviesByGenre/:genre
 */
router.route('/getMoviesByGenre/:genre')
    .get(movieController.getMoviesByGenre);


/**
 * Counter of all the movies
 * http://localhost:8080/movies/countMovies
 */
router.route('/countMovies')
    .get(movieController.countMovies);


/**
 * post - create a movie
 * get - gets all movies
 * http://localhost:8080/movies
 */
router.route('/')
    .post(movieController.createMovie)
    .get(movieController.getMovies);


/**
 * Get movies by input number and by average of rating
 * http://localhost:8080/movies/topMovies/:topNumber
 */
router.route('/topMovies/:topNumber')
    .get(movieController.topMoviesByRating);

/**
 * Get all movies by average of rating
 * http://localhost:8080/movies/topMovies
 */
router.route('/topMovies')
    .get(movieController.topMoviesByRating);

/**
 * Get movie by title name
 * http://localhost:8080/movies/title/:movieTitle
 */
router.route('/title/:movieTitle')
    .get(movieController.getMovieByTitle);


/**
 * Count by genre
 * http://localhost:8080/movies/countByGenre
 */
router.route('/countByGenre')
    .get(movieController.countByGenre);

/**
 * Get movies by genre
 * http://localhost:8080/movies/moviesByGenre
 */
router.route('/moviesByGenre')
    .get(movieController.moviesByGenre);



/**
 * map reduce - average on number of movies by year
 * http://localhost:8080/movies/avgRatingByYear
 */
router.route('/avgRatingByYear')
    .get(movieController.avgRatingByYear);


/**
 * get - Gets movie by id
 * patch - Update movie by id
 * delete - Delete movie by id
 * http://localhost:8080/movies/:movieId
 */
router.route('/:movieId')
    .get(movieController.getMovieById)
    .patch(movieController.updateMovies)
    .delete(movieController.deleteMovie);



module.exports = router;