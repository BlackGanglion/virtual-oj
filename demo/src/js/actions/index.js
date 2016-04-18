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
    reddit: oj,
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
