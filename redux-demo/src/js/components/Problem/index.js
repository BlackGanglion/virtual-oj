export ProblemList from './ProblemList';
export ProblemListReducer from './ProblemListRedux';

export ProblemNav from './ProblemNav';
export problemNavReducer from './ProblemListRedux';

/*
import React from 'react';
import ProblemList from './problemList';
import ProblemNav from './problemNav';

class Problem extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { OjType, posts, onChange } = this.props;
    const OJList = ['HDOJ', 'POJ', 'ZOJ', 'TOJ'];
    return (
      <div>
        <ProblemNav OjType={OjType} onChange={onChange} OJList={OJList} />
        <ProblemList posts={posts} OJList={OJList} />
      </div>
    );
  }
}

export default Problem;
*/
