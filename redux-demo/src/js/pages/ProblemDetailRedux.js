import fetch from 'isomorphic-fetch';

const ACTION_PREFIX = 'problemDetail/page/';

const LOAD_PROBLEM = ACTION_PREFIX + 'LOAD_PROBLEM';
function loadProblem() {
  return {
    type: LOAD_PROBLEM
  }
}

const SUCCESS_PROBLEM = ACTION_PREFIX + 'SUCCESS_PROBLEM';
function successProblem(json) {
  return {
    type: SUCCESS_PROBLEM,
    payload: {
      problem: json.body.data
    }
  }
}

function requestProblem(params) {
  return (dispatch, getState) => {
    dispatch(loadProblem());
    return dispatch(fetchProblem(params));
  }
}

function fetchProblem(params) {
  const url = `http://127.0.0.1:3000/pro?OJId=${params.OJId}&pid=${params.pid}`;
  return (dispatch, getState) => {
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(successProblem(json)))
  }
}

export const actions = {
  requestProblem
}

const initialState = {
  loading: true,
  proData: {
    description: ''
  }
}

export default function ProblemDetailReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_PROBLEM: {
      return {
        ...state,
        loading: true
      }
    }
    case SUCCESS_PROBLEM: {
      console.log(action);
      return {
        ...state,
        loading: false,
        proData: action.payload.problem[0]
      }
    }
    default: {
      return state;
    }
  }
}
