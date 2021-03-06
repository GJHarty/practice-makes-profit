import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* decreaseBalances(action) {
  try {
    yield axios.put('/api/user', action.payload);
    yield fetchUser();
  } catch (err) {
    console.log('Balance decrease failed', err);
  }
}

function* increaseBalances(action) {
  try {
    yield axios.put('/api/user', action.payload);
    yield fetchUser();
  } catch (err) {
    console.log('Balance increase failed', err);
  }
}

function* deleteUser() {
  try {
    yield axios.delete('/api/user');
  } catch (err) {
    console.log('Error deleting User', err);
  }
}

function* increaseFunding(action) {
  try {
    yield axios.put('/api/user/funds', action.payload);
    yield fetchUser();
  } catch (err) {
    console.error('Error increasing funding', err);
  }
}

function* updateFirstTime() {
  try {
    yield axios.put('/api/user/first-visit');
  } catch (err) {
    console.error('Error updating first time user value', err);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('DECREASE_BALANCES', decreaseBalances);
  yield takeLatest('INCREASE_BALANCES', increaseBalances);
  yield takeLatest('DELETE_USER', deleteUser);
  yield takeLatest('INCREASE_FUNDING', increaseFunding);
  yield takeLatest('UPDATE_FIRST_TIME', updateFirstTime);
}

export default userSaga;
