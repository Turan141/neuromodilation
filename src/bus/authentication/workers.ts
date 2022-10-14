import { put, call } from 'redux-saga/effects';

import { authenticationActions } from '@bus/authentication/actions';
import { login, refresh, logout } from '@api/Authorization';

export function* workerAuthentication(action: any) {
  yield put(authenticationActions.authenticationRequest());

  const { data } = yield call(login, action.payload);

  localStorage.setItem('@admin_ACCESS_TOKEN', data.accessToken);
  yield put(authenticationActions.authenticationSuccess(true));
  yield put(authenticationActions.authenticationFailed(null));
}

export function* workerCheck() {
  yield put(authenticationActions.checkRequest());
  const token = localStorage.getItem('@admin_ACCESS_TOKEN');
  if (token) {
    yield put(authenticationActions.checkSuccess(true));
    const { data } = yield call(refresh);
    if (data) {
      localStorage.setItem('@admin_ACCESS_TOKEN', data.accessToken);
      yield put(authenticationActions.authenticationSuccess(true));
    }
  } else {
    yield put(authenticationActions.checkSuccess(false));
    yield put(authenticationActions.checkFailed(null));
  }
}

export function* workerLogout() {
  const token = localStorage.getItem('@admin_ACCESS_TOKEN');
  yield call(logout, { token: token });
  yield put(authenticationActions.authenticationSuccess(false));
  localStorage.removeItem('@admin_ACCESS_TOKEN');
  yield put(authenticationActions.checkSuccess(false));
}
