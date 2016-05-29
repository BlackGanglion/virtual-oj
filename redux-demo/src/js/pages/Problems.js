import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { ProblemNav, ProblemList } from '../components/Problem';

class Problems extends Component {
  render() {
    return (
      <div>
        <ProblemNav />
        <ProblemList />
      </div>
    )
  }
}

export default Problems;
