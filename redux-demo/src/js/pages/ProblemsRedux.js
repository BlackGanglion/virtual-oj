import { ProblemNavReducer, ProblemListReducer } from '../components/Problem';
import { combineReducers } from 'redux';

export default combineReducers({
  problemNav: ProblemNavReducer,
  problemList: ProblemListReducer
});
