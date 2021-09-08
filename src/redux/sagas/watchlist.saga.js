import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

function* createWatchlistedStock(action) {
  try {
    yield axios.post('/api/watchlist', action.payload);
  } catch (err) {
    console.log('Create watchlisted stock request failed', err);
  }
}

function* deleteWatchlistedStock(action) {
  try {
    console.log('delete payload', action.payload);
    yield axios.delete('/api/watchlist', {data: action.payload});
    yield fetchWatchlist();
  } catch (err) {
    console.log('Create watchlisted stock request failed', err);
  }
}

function* fetchWatchlist() {
  try {
    const response = yield axios.get('/api/watchlist');
    yield put({
      type: 'CLEAR_DETAILED_WATCHLIST'
    })
    yield put({
        type: 'SET_WATCHLIST',
        payload: response.data,
    });
    yield all(response.data.map(stock => call(setDetailedWatchlist, stock.stockSymbol)));

  } catch (err) {
    console.log('Create watchlisted stock request failed', err);
  }
}

function* setDetailedWatchlist(symbol) {
  try {
      const response = yield axios.get('/api/search', {params: {symbol}});
      const historyResponse = yield axios.get('/api/history', {params: {symbol}});
      yield put({
          type: 'SET_DETAILED_WATCHLIST',
          payload: {
            stockSymbol: symbol,
            data: response.data,
            history: historyResponse.data.c
          }
      });
    } catch (err) {
      console.log('Create watchlisted stock request failed', err);
  }
}

function* watchlistSaga() {
  yield takeLatest('CREATE_WATCHLISTED_STOCK', createWatchlistedStock);
  yield takeLatest('FETCH_WATCHLIST', fetchWatchlist);
  yield takeLatest('DELETE_WATCHLISTED_STOCK', deleteWatchlistedStock);
}

export default watchlistSaga;