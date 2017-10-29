import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fantasyReducer,breakdownReducer } from './reducers';

export default combineReducers({
  routing: routerReducer,
  fantasyReducer,
  breakdownReducer

});
