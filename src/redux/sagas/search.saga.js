import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_STOCK_DETAILS" actions
function* fetchStockDetails(action) {
    try {
      const response = yield axios.get('/api/search', {params: {symbol: action.payload}});
      yield put({
          type: 'SET_SEARCH_RESULTS',
          payload: response.data
      });
    } catch (err) {
      console.log('Stock Details request failed', err);
    }
}

function* fetchStockHistory(action) {
  try {
    const response = yield axios.get('/api/history', {params: {symbol: action.payload}});
    yield put({
        type: 'SET_STOCK_HISTORY',
        payload: response.data
    });
  } catch (err) {
    console.log('Stock Details request failed', err);
  }
}

  
function* stockDetailsSaga() {
    yield takeLatest('FETCH_STOCK_DETAILS', fetchStockDetails);
    yield takeLatest('FETCH_STOCK_HISTORY', fetchStockHistory);
}
  
export default stockDetailsSaga;
  