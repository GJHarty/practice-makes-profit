const watchlistReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_WATCHLIST':
        return action.payload;
/*       case 'SET_WATCHLIST_ITEM':
        return [...state, action.payload]; */
      default:
        return state;
    }
};
  
  // user will be on the redux state at:
  // state.user
  export default watchlistReducer;