import { all, takeLatest, call, takeEvery } from 'redux-saga/effects';

import { authenticationTypes } from './types';
import { workerAuthentication, workerCheck, workerLogout } from './workers';

function* watchAuthentication() {
  yield takeLatest(
    authenticationTypes.AUTHENTICATION_ASYNC,
    workerAuthentication,
  );
}

function* watchCheck() {
  yield takeLatest(authenticationTypes.CHECK_ASYNC, workerCheck);
}

function* watchLogout() {
  yield takeLatest(authenticationTypes.LOGOUT_ASYNC, workerLogout);
}

export function* watchAuth() {
  yield all([call(watchAuthentication), call(watchCheck), call(watchLogout)]);
}
