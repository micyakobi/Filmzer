const base_url = "http://localhost:8080/reviews";

// post - Create a review
// get - Gets all reviews
export const reviewsURL = () => `${base_url}/`;

// Find reviews by movie title, rating, and username
// param - title=rating=username
export const searchedReviewsURL = (title, rating, username) => `${base_url}/getReviewByParams/${title}=${rating}=${username}`;

// Counter of all the reviews
export const reviewsCountURL = () => `${base_url}/countReviews`;

// Get all the latest reviews (all reviews by descending dates)
export const latestReviewsURL = () => `${base_url}/latestReviews`;

// Get X reviews (by param inserted) sorted in descending date (top X latest reviews)
export const topLatestReviewsURL = (topNumWanted) => `${base_url}/latestReviews/${topNumWanted}`;

// Get reviews by movie id input
export const reviewsByMovieIdURL = (id) => `${base_url}/getReviewsByMovieId/${id}`;

// Get all reviews with the movies and the users connected to it
export const reviewsWithMoviesAndUsersURL = () => `${base_url}/getReviewsMoviesUsers`;

// get - Get review by id
// delete - Delete review by id
// patch - Update review by id
export const reviewsByIdURL = (id) => `${base_url}/${id}`;
