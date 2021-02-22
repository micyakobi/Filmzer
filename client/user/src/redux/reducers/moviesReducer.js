const initState = {
  allMovies: [],
  topMovies: [],
  searchedMovies: [],
}

const moviesReducer = (state = initState, action) => {
  switch (action.type) {

    case "FETCH_MOVIES":
      return {
        ...state,
        allMovies: action.payload.allMovies,
      };
    case "FETCH_TOP_MOVIES":
      return {
        ...state,
        topMovies: action.payload.topMovies,
      };
    case "FETCH_SEARCHED_MOVIES":
      return {
        ...state,
        searchedMovies: action.payload.searchedMovies,
      }
    default:
      return { ...state };
  }
}

export default moviesReducer;