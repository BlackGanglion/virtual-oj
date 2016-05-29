import { combineReducers } from 'redux';
import { ProblemNavReducer, ProblemListReducer } from '../components/Problem';

export default combineReducers({
  problemNav: ProblemNavReducer,
  problemList: ProblemListReducer
});

/*
import { combineReducers } from 'redux'
import { SELECT_OJ, REQUEST_POSTS, RECEIVE_POSTS } from '../actions'

function selectedOJ(state = 'HDOJ', action) {
  switch (action.type) {
    case SELECT_OJ:
      return action.oj
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByOJ(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.oj]: posts(state[action.oj], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByOJ,
  selectedOJ
})

export default rootReducer
*/
