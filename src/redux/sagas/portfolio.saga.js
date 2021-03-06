import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

function* fetchPortfolio() {
    try {
      const response = yield axios.get('/api/portfolio');
      // check to see if we need this
      yield put({
          type: 'SET_PORTFOLIO',
          payload: response.data,
      });
      yield all(response.data.map(stock => call(setDetailedPortfolio, stock)));
  
    } catch (err) {
      console.log('Create watchlisted stock request failed', err);
    }
  }

function* setDetailedPortfolio(stock) {
  try {
      const response = yield axios.get('/api/search', {params: {symbol: stock.stockSymbol}});
      const historyResponse = yield axios.get('/api/history', {params: {symbol: stock.stockSymbol}});
      const transactions = yield axios.get('/api/portfolio/transactions', {params: {symbol: stock.stockSymbol}});
      yield put({
          type: 'SET_DETAILED_PORTFOLIO',
          payload: {
            stockSymbol: stock.stockSymbol,
            dbData: stock,
            data: response.data,
            history: historyResponse.data.c,
            transactions: transactions.data,
          }
      });
    } catch (err) {
      console.log('Create detailed portfolio request failed', err);
  }
}

function* createSoldStock(action) {
  try {
    yield axios.post('/api/portfolio', action.payload);
  } catch (err) {
    console.log('Create purchased stock request failed', err);
  }
}

function* deletePortfolioStock(action) {
  try {
    yield axios.delete('/api/portfolio', {data: action.payload});
    yield put({
      type: 'CLEAR_DETAILED_PORTFOLIO'
    })
    yield put({
      type: 'FETCH_PORTFOLIO'
    });
  } catch (err) {
    console.log('Delete portfolio stock request failed', err);
  }
}

function* portfolioSaga() {
    yield takeLatest('FETCH_PORTFOLIO', fetchPortfolio);
    yield takeLatest('CREATE_SOLD_STOCK', createSoldStock);
    yield takeLatest('DELETE_PORTFOLIO_STOCK', deletePortfolioStock);
}
  
export default portfolioSaga;