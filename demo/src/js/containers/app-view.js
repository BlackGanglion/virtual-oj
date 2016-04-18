import React from 'react';
import { connect } from 'react-redux'
import { selectOJ, fetchPostsIfNeeded } from '../actions'
import Problem from '../components/problem/problem';

class AppView extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const { dispatch, selectedOJ } = this.props;
    dispatch(fetchPostsIfNeeded(selectedOJ));
  };

  handleChange(nextOJ) {
    const { dispatch } = this.props;
    dispatch(selectOJ(nextOJ));
  };

  render() {
    const { selectedOJ, posts, isFetching, lastUpdated } = this.props;
    return (
      <Problem OjType={selectedOJ} onChange={this.handleChange} posts={posts} />
    );
  }
}

function mapStateToProps(state) {
  const { selectedOJ, postsByOJ } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByOJ[selectedOJ] || {
    isFetching: true,
    items: []
  }

  return {
    selectedOJ,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AppView);
