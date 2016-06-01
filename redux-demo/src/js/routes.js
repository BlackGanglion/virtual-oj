import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { Problems, ProblemDetail } from './pages';

export default (
  <Route path="/">
    <IndexRoute component={Problems}/>
    <Route path="/problems" component={Problems} />
    <Route path="/problem/:OJId/:pid" component={ProblemDetail} />
  </Route>
);
