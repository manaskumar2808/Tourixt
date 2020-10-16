import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
// import '~video-react/dist/video-react.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

import {applyMiddleware,createStore,compose,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom';
import authReducer from './store/reducers/authReducers';
import profileReducer from './store/reducers/profileReducers';
import postReducer from './store/reducers/postReducers';
import commentReducer from './store/reducers/commentReducers';
import followReducer from './store/reducers/followReducers';
import placeReducer from './store/reducers/placeReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  prf: profileReducer,
  pst: postReducer,
  cmt: commentReducer,
  flw: followReducer,
  plc: placeReducer,
});

const logger = store => {
  return next => {
    return action => {
      const result = next(action);
      return result;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger,thunk)));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
