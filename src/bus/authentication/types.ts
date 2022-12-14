export const authenticationTypes = {
  // Sync
  AUTHENTICATION_REQUEST: 'AUTHENTICATION|AUTHENTICATION_REQUEST',
  AUTHENTICATION_SUCCESS: 'AUTHENTICATION|AUTHENTICATION_SUCCESS',
  AUTHENTICATION_FAILED: 'AUTHENTICATION|AUTHENTICATION_FAILED',

  CHECK_REQUEST: 'AUTHENTICATION|CHECK_REQUEST',
  CHECK_SUCCESS: 'AUTHENTICATION|CHECK_SUCCESS',
  CHECK_FAILED: 'AUTHENTICATION|CHECK_FAILED',

  LOGOUT_SUCCESS: 'AUTHENTICATION|LOGOUT_SUCCESS',

  // Async
  AUTHENTICATION_ASYNC: 'AUTHENTICATION|AUTHENTICATION_ASYNC',
  CHECK_ASYNC: 'AUTHENTICATION|CHECK_ASYNC',
  LOGOUT_ASYNC: 'AUTHENTICATION|LOGOUT_ASYNC',
};
