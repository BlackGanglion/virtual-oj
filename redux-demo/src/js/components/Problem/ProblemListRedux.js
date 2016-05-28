import fetch from 'isomorphic-fetch';

const ACTION_PREFIX = 'problems/problemList/';

const REQUEST_PROBLEMS = ACTION_PREFIX + 'REQUEST_PROBLEMS';
function requestProblem() {

}


export const action = {
};

const initialState = {
  ojList: []
}

export default function ProblemListReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROBLEMS: {
      return state;
    }
    default: {
      return state;
    }
  }
}
