import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createWatchlistedStock(action) {
    try {
      yield axios.post('/api/watchlist', action.payload);
    } catch (err) {
      console.log('Create watchlisted stock request failed', err);
    }
}

function* fetchWatchlist() {
    try {
      const response = yield axios.get('/api/watchlist');
      yield put({
          type: 'SET_WATCHLIST',
          payload: response.data,
      });
    } catch (err) {
      console.log('Create watchlisted stock request failed', err);
    }
}

function* watchlistSaga() {
    yield takeLatest('CREATE_WATCHLISTED_STOCK', createWatchlistedStock);
    yield takeLatest('FETCH_WATCHLIST', fetchWatchlist);
}

export default watchlistSaga;