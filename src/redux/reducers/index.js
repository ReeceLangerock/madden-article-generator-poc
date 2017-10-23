import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fantasyReducer } from './reducers';

export default combineReducers({
  routing: routerReducer,
  fantasyReducer,

});
