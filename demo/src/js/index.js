import '../css/index.scss';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppView from './containers/app-view';
import configureStore from './store/configureStore'

const store = configureStore();

render(
  <Provider store={store}>
    <AppView />
  </Provider>,
  document.getElementById('app-container')
);
