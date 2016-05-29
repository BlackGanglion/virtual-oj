const ACTION_PREFIX = 'problems/problemNav/';

const SELECT_OJ = ACTION_PREFIX + 'SELECT_OJ';
function selectOJ(OJId) {
  return {
    type: SELECT_OJ,
    payload: {
      OJId
    }
  }
}

const SEARCH_PID = ACTION_PREFIX + 'SEARCH_PID';
function onSearchPid(searchPid) {
  return {
    type: SEARCH_PRO_ID,
    payload: {
      searchProId
    }
  }
}

export const actions = {
  selectOJ,
  onSearchPid
};

const initialState = {
  OJId: 0,
  searchPid: '',
};

export default function ProblemNavReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_OJ: {
      return {
        ...state,
        OJId: action.payload.OJId
      }
    }
    case SEARCH_PID: {
      return {
        ...state,
        searchPid: action.payload.searchPid
      }
    }
    default: {
      return state;
    }
  }
}
