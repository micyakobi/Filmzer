const base_url = "http://localhost:8080/movies";

// post - create a movie
// get - gets all movies
export const moviesURL = () => `${base_url}/`;

// get - Gets movie by id
// patch - Update movie by id
// delete - Delete movie by id
export const movieByIdURL = () => `${base_url}/:movieId`;

// Get movies by input number and by average of rating
export const topMoviesURL = (topNumWanted) => `${base_url}/topMovies/${topNumWanted}`;

// Get movie by title name
export const moviesByTitleURL = () => `${base_url}/title/:movieTitle`;

// Find movies by movie title, movie genre, and movie year
// param - title=genre=year
export const searchedMoviesURL = (title, genre, year) => `${base_url}/getMovieByParams/${title}=${genre}=${year}`;

// ==========================================

// Get movies by genre
export const moviesByGenreURL = () => `${base_url}/getMoviesByGenre/:genre`;

// Counter of all the movies
export const moviesCountURL = () => `${base_url}/countMovies`;

// Get all movies by average of rating
export const moviesByRatingURL = () => `${base_url}/topMovies`;

// Count by genre
export const moviesCountByGenreURL = () => `${base_url}/countByGenre`;

// map reduce - average on number of movies by year
export const MoviesAverageRatingByYearURL = () => `${base_url}/avgRatingByYear`;

