import fetch from 'isomorphic-fetch';
import { OJList } from '../../config/config';

const ACTION_PREFIX = 'problems/problemList/';

const LOAD_PROBLEMS = ACTION_PREFIX + 'LOAD_PROBLEMS';
function loadProblems() {
  return {
    type: LOAD_PROBLEMS
  }
}

const SUCCESS_PROBLEMS = ACTION_PREFIX + 'SUCCESS_PROBLEMS';
function successProblems(json) {
  return {
    type: SUCCESS_PROBLEMS,
    payload: {
      problems: json.body.data,
      isFetchPro: json.body.isFetchPro
    }
  }
}

function requestProblems(params) {
  return (dispatch, getState) => {
    dispatch(loadProblems());
    return dispatch(fetchProblems(params));
  }
}

function fetchProblems(params) {
  const url = `http://127.0.0.1:3000/problem?OJId=${params.OJId}&searchPid=${params.searchPid}`;
  // console.log(url);
  return (dispatch, getState) => {
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(successProblems(json)))
  }
}

export const actions = {
  requestProblems
};

const initialState = {
  OJProblems: [],
  loading: false,
  isFetchPro: false
}

export default function ProblemListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROBLEMS: {
      return {
        ...state,
        loading: true
      }
    }
    case SUCCESS_PROBLEMS: {
      let OJProblems = action.payload.problems.map(function(e, i){
        return {
          OJId: OJList[e.ojid].OJName,
          pid: e.pid,
          title: e.title,
          time: e.time,
          source: e.source,
          status: e.status
        }
      })
      return {
        ...state,
        loading: false,
        isFetchPro: action.payload.isFetchPro,
        OJProblems
      }
    }
    default: {
      return state;
    }
  }
}
