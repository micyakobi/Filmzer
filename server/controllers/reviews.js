const reviewsService = require('../services/reviews');
const moviesService = require('../services/movies');
const usersService = require('../services/users');

const createReview = async (req, res) => {
    const newReview = await reviewsService.createReview(req.body);
    res.json(newReview);
};


const getReviews = async (req, res) => {
    const review = await reviewsService.getReviews();
    res.json(review);
};


const getReviewsByMovieId = async (req, res) => {
    const review_ids = await moviesService.getReviewsByMovieId(req.params.movieId);

    const reviews = await reviewsService.getReviewsByIds(review_ids.reviews)

    if (!reviews){
        return res.status(404).json({errors: ['Reviews not found']});
    }

    res.json(reviews);
};


const getReviewsMoviesUsers = async (req, res) => {
    const reviews = await reviewsService.getReviewsMoviesUsers();
    res.json(reviews);
};


const searchReview = async (req, res) => {

    var [title, rating, user] = req.params.param.split('=');

    if(title === ''){
        title =  null
    }

    if(user === ''){
        user =  null
    }

    if(rating === ''){
        rating =  NaN
    }

    const reviews = await reviewsService.searchReview(title, rating, user);

    if (!reviews){
        return res.status(404).json({errors: ['reviews not found']});
    }

    res.json(reviews);
};


const topReviewsByDate = async (req, res) => {

    if (!req.params.topNumber){
        var topNumber = await reviewsService.countReviews();
    }
    else{
        var topNumber = req.params.topNumber;
    }

    const reviews = await reviewsService.topReviewsByDate(topNumber);
    res.json(reviews);
};


const countReviews = async (req, res) => {
    const review = await reviewsService.countReviews();
    res.json(review);
};


const getReviewById = async (req, res) => {

    const review = await reviewsService.getReviewById(req.params.id);

    if (!review){
        return res.status(404).json({errors: ['review_id not found']});
    }

    res.json(review);
};


const getReviewsByTitleRatingUsername = async (req, res) => {

    var [movieTitle, rating, userName] = req.params.param.split('=');

    if(movieTitle === ''){
        movieTitle =  null
    }

    if(userName === ''){
        userName =  null
    }

    if(rating === ''){
        rating =  NaN
    }

    const allReviews = await reviewsService.getReviewsMoviesUsers(movieTitle, rating, userName);

    if (!allReviews){
        return res.status(404).json({errors: ['reviews not found']});
    }

    res.json(allReviews);
};


const updateReview = async (req, res) => {

    if (!req.body) {
        res.status(400).json({
            message: "reviews param are required",
        });
    }

    const reviews = await reviewsService.updateReview(req.params.id, req.body);
    if (!reviews) {
        return res.status(404).json({ errors: ['reviews not found'] });
    }

    res.json(reviews);
};


const deleteReview = async (req, res) => {

    const reviewId = req.params.id;

    const movie = await moviesService.removeMovieReviews([reviewId]);

    if(movie.nModified===0){
        return res.status(404).json({ errors: ['cant find review on movies table to update'] });
    }


    const user = await usersService.removeUserReviews([reviewId]);

    if(user.nModified===0){
        return res.status(404).json({ errors: ['cant find review on users table to update'] });
    }


    const review = await reviewsService.deleteReview(reviewId);
    if (!review) {
        return res.status(404).json({ errors: ['review not found'] });
    }

    res.send();
};


module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewsByTitleRatingUsername,
    countReviews,
    topReviewsByDate,
    getReviewsByMovieId,
    getReviewsMoviesUsers,
    searchReview
}
