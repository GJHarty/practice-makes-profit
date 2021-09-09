const detailedPortfolioReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DETAILED_PORTFOLIO':
        return [...state, action.payload];
      case 'CLEAR_DETAILED_PORTFOLIO':
        return [];
      default:
        return state;
    }
};
  
  // user will be on the redux state at:
  // state.user
export default detailedPortfolioReducer;