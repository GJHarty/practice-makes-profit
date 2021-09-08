const detailedWatchlistReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DETAILED_WATCHLIST':
        return [...state, action.payload];
      case 'CLEAR_DETAILED_WATCHLIST':
        return [];
      default:
        return state;
    }
};
  
  // user will be on the redux state at:
  // state.user
export default detailedWatchlistReducer;