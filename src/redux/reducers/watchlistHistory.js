const watchlistHistoryReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_WATCHLIST_HISTORY':
        return [...state, action.payload];
      case 'CLEAR_WATCHLIST_HISTORY':
        return [];
      default:
        return state;
    }
};
  
  // user will be on the redux state at:
  // state.user
export default watchlistHistoryReducer;