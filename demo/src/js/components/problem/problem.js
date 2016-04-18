import React from 'react';
import ProblemList from './problemList';
import ProblemNav from './problemNav';

class Problem extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { OjType } = this.props;
    return (
      <div>
        <ProblemNav OjType={OjType}/>
        <ProblemList />
      </div>
    );
  }
}

export default Problem;
