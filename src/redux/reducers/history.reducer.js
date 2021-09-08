const historyReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STOCK_HISTORY':
        return action.payload;
      case 'CLEAR_STOCK_HISTORY':
        return [];
      default:
        return state;
    }
  };
  
export default historyReducer;