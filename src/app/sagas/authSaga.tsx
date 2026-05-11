import { call, put, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants/authConstants';
import { loginApi, setAuthToken } from '../api/authApi';

function* loginSaga(action) {
  try {
    // Call the Symfony API
    const response = yield call(loginApi, action.payload);
    
    // Extract token and user from response
    const { token, user } = response.data;
    
    // Set token in axios headers for future requests
    setAuthToken(token);
    
    // Dispatch success - data saved exclusively in reducer
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        token: token,
        user: user,
      },
    });
  } catch (error) {
    // Handle different error responses
    let errorMessage = 'Login failed. Please try again.';
    
    if (error.response) {
      // Server responded with error status
      if (error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.request) {
      // Request was made but no response
      errorMessage = 'Cannot connect to server. Check your connection.';
    }
    
    // Dispatch failure
    yield put({
      type: LOGIN_FAILURE,
      payload: errorMessage,
    });
  }
}

export function* watchAuth() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}