const express = require('express');
const reviewController = require('../controllers/reviews');
var router = express.Router();


/**
 * Find reviews by movie title, rating, and username
 * param - title=rating=username
 * http://localhost:8080/reviews/getReviewByParams/:param
 */
router.route('/getReviewByParams/:param')
    .get(reviewController.getReviewsByTitleRatingUsername)


/**
 * Search by title review, rating, user
 * param - title=rating=user
 * http://localhost:8080/reviews/searchReview/:param
 */
router.route('/searchReview/:param')
    .get(reviewController.searchReview)


/**
 * Counter of all the reviews
 * http://localhost:8080/reviews/countReviews
 */
router.route('/countReviews')
    .get(reviewController.countReviews);


/**
 * Get all reviews sort by desc date
 * http://localhost:8080/reviews/latestReviews
 */
router.route('/latestReviews')
    .get(reviewController.topReviewsByDate);


/**
 * Get reviews by input number and sorting by date desc
 * http://localhost:8080/reviews/latestReviews/:topNumber
 */
router.route('/latestReviews/:topNumber')
    .get(reviewController.topReviewsByDate);


/**
 * Get reviews by movie id input
 * http://localhost:8080/reviews/getReviewsByMovieId/:movieId
 */
router.route('/getReviewsByMovieId/:movieId')
    .get(reviewController.getReviewsByMovieId)


/**
 * Get all reviews with her movies and the users
 * http://localhost:8080/reviews/getReviewsMoviesUsers
 */
router.route('/getReviewsMoviesUsers')
    .get(reviewController.getReviewsMoviesUsers)


/**
 * post - Create a review
 * get - Gets all reviews
 * http://localhost:8080/reviews
 */
router.route('/')
    .post(reviewController.createReview)
    .get(reviewController.getReviews);


/**
 * get - Get review by id
 * delete - Delete review by id
 * patch - Update review by id
 * http://localhost:8080/reviews/:id
 */
router.route('/:id')
    .get(reviewController.getReviewById)
    .delete(reviewController.deleteReview)
    .patch(reviewController.updateReview);


module.exports = router;