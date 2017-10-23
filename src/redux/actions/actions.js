import axios from 'axios';
import { GET_INDIVIDUAL_RESOURCE, SAVE_SEARCH_RESULTS } from './types';

// use redux-thunk and async/await for async actions
// async/await allows you to write async code (promises) as if it is synchronous
export const getPPRScores = ()=> async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3001/calculate`, {
      userID: 123
    });
    console.log(res.data)
    dispatch({ type: 'SAVE_PPR_RESULTS', data: res.data });
  } catch (err) {
    // throw error
  }
};
