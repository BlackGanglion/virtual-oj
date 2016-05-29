import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(rootReducer, history) {
  const reducers = combineReducers({
    ...rootReducer,
    routing: routerReducer // router info
  });

  const initialState = {};

  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(routerMiddleware(history), thunkMiddleware, createLogger())
  );

  return store;
};
