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

/*
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
*/

/*
import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_OJ = 'SELECT_OJ'

export function selectOJ(oj) {
  return {
    type: SELECT_OJ,
    oj
  }
}

function requestPosts(oj) {
  return {
    type: REQUEST_POSTS,
    oj
  }
}

function receivePosts(oj, json) {
  return {
    type: RECEIVE_POSTS,
    oj: oj,
    posts: json,
    receivedAt: Date.now()
  }
}

function fetchPosts(oj) {
  return dispatch => {
    dispatch(requestPosts(oj))
    return fetch(`/api/${oj}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(oj, json)))
  }
}

export function fetchPostsIfNeeded(oj) {
  return (dispatch, getState) => {
    return dispatch(fetchPosts(oj))
  }
}


class AppView extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  componentDidMount() {
    const { dispatch, selectedOJ } = this.props;
    dispatch(fetchPostsIfNeeded(selectedOJ));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedOJ !== this.props.selectedOJ) {
      const { dispatch, selectedOJ } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedOJ));
    }
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

export default AppView;
*/
