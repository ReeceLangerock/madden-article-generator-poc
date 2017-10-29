import axios from 'axios'

// use redux-thunk and async/await for async actions
// async/await allows you to write async code (promises) as if it is synchronous
export const getPPRScores = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3001/calculate`, {})
    dispatch({ type: 'SAVE_PPR_RESULTS', data: res.data })
  } catch (err) {
    // throw error
  }
}

export const getPositionalBreakdown = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3001/breakdown`, {})
    dispatch({ type: 'SAVE_BREAKDOWN_RESULTS', data: res.data })
  } catch (err) {
    // throw error
  }
}
