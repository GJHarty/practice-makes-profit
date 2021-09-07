const searchReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_STOCK_HISTORY':
        return action.payload;
      default:
        return state;
    }
  };
  
export default searchReducer;