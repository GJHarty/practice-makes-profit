import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStockHistory(action) {
    try {
      const response = yield axios.get('/api/history', {params: {symbol: action.payload}});
      yield put({
          type: 'SET_STOCK_HISTORY',
          payload: response.data.c
      });
    } catch (err) {
      console.log('Fetch stock history request failed', err);
    }
  }

function* setWatchlistHistory(symbol) {
    try {
        const response = yield axios.get('/api/history', {params: {symbol}});
        yield put({
            type: 'SET_WATCHLIST_HISTORY',
            payload: {
              stockSymbol: symbol,
              data: response.data,
            }
        });
      } catch (err) {
        console.log('Create watchlisted stock request failed', err);
    }
}

function* stockHistorySaga() {
    yield takeLatest('FETCH_STOCK_HISTORY', fetchStockHistory);
    yield takeLatest('FETCH_WATCHLIST_HISTORY', setWatchlistHistory);
}
  
export default stockHistorySaga;