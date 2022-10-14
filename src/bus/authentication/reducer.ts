import { createReducer } from '@reduxjs/toolkit';

import { authenticationActions } from '@bus/authentication/actions';

interface InitialState {
  isAuth: boolean;
  isLoadingAuth: boolean;
  error: string | null;
}

const initialState: InitialState = {
  isAuth: false,
  isLoadingAuth: false,
  error: null,
};

export const authenticationReducer = createReducer(initialState, (builder) => {
  builder.addCase(authenticationActions.authenticationRequest, (state) => ({
    ...state,
    isLoadingAuth: true,
    error: null,
  }));

  builder.addCase(
    authenticationActions.authenticationSuccess,
    (state, action) => ({
      ...state,
      isAuth: action.payload,
      isLoadingAuth: false,
    }),
  );

  builder.addCase(
    authenticationActions.authenticationFailed,
    (state, action) => ({
      ...state,
      loadingContacts: false,
      error: action.payload,
    }),
  );

  builder.addCase(authenticationActions.checkRequest, (state) => ({
    ...state,
    isLoadingAuth: false,
    error: null,
  }));

  builder.addCase(authenticationActions.checkSuccess, (state, action) => ({
    ...state,
    isAuth: action.payload,
    isLoadingAuth: false,
  }));

  builder.addCase(authenticationActions.checkFailed, (state, action) => ({
    ...state,
    loadingContacts: false,
    error: action.payload,
  }));

  builder.addCase(authenticationActions.logoutSuccess, () => ({
    isAuth: false,
    isLoadingAuth: false,
    error: null,
  }));
});
