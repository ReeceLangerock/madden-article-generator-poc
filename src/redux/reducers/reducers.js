export const fantasyReducer = (
  state = {
    players: {
      qb: [],
      wr: [],
      hb: [],
      te: []
    }
  },
  action
) => {
  switch (action.type) {
    case 'SAVE_PPR_RESULTS':
      return { ...state, players: action.data }
    default:
      return state
  }
}

export const breakdownReducer = (
  state = {
    breakdowns: []
  },
  action
) => {
  switch (action.type) {
    case 'SAVE_BREAKDOWN_RESULTS':
      return { ...state, breakdowns: action.data }
    default:
      return state
  }
}
