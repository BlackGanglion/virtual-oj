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

const CHANGE_PAGE = ACTION_PREFIX + 'CHANGE_PAGE';
function changePage(page) {
  return {
    type: CHANGE_PAGE,
    payload: {
      page
    }
  }
}

const SEARCH_PRO_TITLE = ACTION_PREFIX + 'SEARCH_PRO_TITLE';
function searchProTitle(title) {
  return {
    type: SEARCH_PRO_TITLE,
    payload: {
      title
    }
  }
}

export const action = {
  selectOJ,
  changePage,
  searchProTitle
};

const initialState = {
  OJId: 0,
  page: 1,
  title: ''
};

export default function ProblemNavReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_OJ: {
      return {
        ...state,
        OJId: action.payload.OJId,
        page: 1
      }
    }
    case CHANGE_PAGE: {
      return {
        ...state,
        page: action.payload.page
      }
    }
    default: {
      return state;
    }
  }
}
