import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { Problems } from './pages';

export default (
  <Route path="/problems" component={Problems} />
);
