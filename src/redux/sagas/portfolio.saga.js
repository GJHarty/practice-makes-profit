import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

function* fetchPortfolio() {
    try {
      const response = yield axios.get('/api/portfolio');
      yield put({
          type: 'SET_PORTFOLIO',
          payload: response.data,
      });
      yield all(response.data.map(stock => call(setDetailedPortfolio, stock.stockSymbol)));
  
    } catch (err) {
      console.log('Create watchlisted stock request failed', err);
    }
  }

function* setDetailedPortfolio(symbol) {
  try {
      const response = yield axios.get('/api/search', {params: {symbol}});
      const historyResponse = yield axios.get('/api/history', {params: {symbol}});
      yield put({
          type: 'SET_DETAILED_PORTFOLIO',
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

function* portfolioSaga() {
    yield takeLatest('FETCH_PORTFOLIO', fetchPortfolio);
}
  
export default portfolioSaga;