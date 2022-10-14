import { createAction } from '@reduxjs/toolkit';

import { authenticationTypes } from '@bus/authentication/types';

export const authenticationActions = {
  // Sync
  authenticationRequest: createAction(
    authenticationTypes.AUTHENTICATION_REQUEST,
  ),
  authenticationSuccess: createAction(
    authenticationTypes.AUTHENTICATION_SUCCESS,
    (data) => ({ payload: data }),
  ),
  authenticationFailed: createAction(
    authenticationTypes.AUTHENTICATION_FAILED,
    (data) => ({ payload: data }),
  ),

  checkRequest: createAction(authenticationTypes.CHECK_REQUEST),
  checkSuccess: createAction(authenticationTypes.CHECK_SUCCESS, (data) => ({
    payload: data,
  })),
  checkFailed: createAction(authenticationTypes.CHECK_FAILED, (data) => ({
    payload: data,
  })),

  logoutSuccess: createAction(authenticationTypes.LOGOUT_SUCCESS),

  // Async
  authenticationAsync: createAction(
    authenticationTypes.AUTHENTICATION_ASYNC,
    (data) => ({ payload: data }),
  ),
  checkAsync: createAction(authenticationTypes.CHECK_ASYNC),
  logoutAsync: createAction(authenticationTypes.LOGOUT_ASYNC),
};
