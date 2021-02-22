import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//Redux Setup
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './redux/reducers/index';
import { Provider } from 'react-redux';
//allows us to use async fetching like axios in action creators for redux reducers
import thunk from 'redux-thunk';

// create store gets only one reducer so we combine it in rootReducer and pass it
// we also add the devtool for redux & thunk as combined param (as create store gets only 2 params)
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnchancer(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

