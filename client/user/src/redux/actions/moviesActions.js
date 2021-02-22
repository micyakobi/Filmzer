import axios from 'axios';
import { moviesURL, movieByIdURL, topMoviesURL, moviesByTitleURL, searchedMoviesURL } from '../../api/movies';

//Action creator - async using thunk

export const loadAllMovies = () => async (dispatch) => {
  //FETCH AXIOS
  const response = await axios.get(moviesURL());
  const allMoviesData = [...response.data].reverse();
  dispatch({
    type: "FETCH_MOVIES",
    payload: {
      allMovies: allMoviesData,
    },
  });
};

export const loadTopMovies = (numWanted) => async (dispatch) => {
  //FETCH AXIOS
  const topMoviesData = await axios.get(topMoviesURL(numWanted));
  dispatch({
    type: "FETCH_TOP_MOVIES",
    payload: {
      topMovies: topMoviesData.data,
    },
  });
};

export const loadSearchedMovies = (title, genre, year) => async (dispatch) => {
  const response = await axios.get(searchedMoviesURL(title, genre, year));
  const searchedMoviesData = [...response.data].reverse();
  dispatch({
    type: "FETCH_SEARCHED_MOVIES",
    payload: {
      searchedMovies: searchedMoviesData,
    },
  });
};
