import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import userReducer from './userReducer';
import reviewsReducer from './reviewReducer';

//combines multiple reducers
const rootReucer = combineReducers({
  movies: moviesReducer,
  reviews: reviewsReducer,
  user: userReducer,
})

export default rootReucer;