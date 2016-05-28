// global css
import '../css/index.scss';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

import rootReducer from '../reducers';
import routes from '../routes';

const store = configureStore(rootReducer, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app-container')
);
