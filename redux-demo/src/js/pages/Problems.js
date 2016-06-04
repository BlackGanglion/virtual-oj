import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { ProblemNav, ProblemList } from '../components/Problem';

class Problems extends Component {
  render() {
    return (
      <div>
        <h1 className="title">Virtual Judge Demo Page</h1>
        <ProblemNav />
        <ProblemList />
      </div>
    )
  }
}

export default Problems;
