const searchReducer = (state = {c: [1]}, action) => {
    switch (action.type) {
      case 'SET_STOCK_HISTORY':
        return action.payload;
      default:
        return state;
    }
  };
  
export default searchReducer;