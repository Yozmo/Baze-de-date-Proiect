import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import { login, loginFailure, loginSuccess, logout, refreshToken, refreshTokenSuccess, getLoggedUserSuccess, updateAccountSuccess } from './auth.actions';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { oAuth2AccessToken, credentials }) => ({ ...state, oAuth2AccessToken, rememberMe: credentials.rememberMe, user: { name: credentials.username, password: credentials.password } })),
  on(getLoggedUserSuccess, (state, { user }) => ({ ...state, loggedUser: user })),
  on(refreshTokenSuccess, (state, { oAuth2AccessToken }) => ({ ...state, oAuth2AccessToken })),
  on(logout, () => initialState),
  on(login, state => ({
    ...state,
    error: null,
    pending: true,
  })),
  on(refreshToken, state => ({
    ...state,
    error: null,
    pending: true,
  })),
  on(loginSuccess, state => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(refreshTokenSuccess, state => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  })),
  on(updateAccountSuccess, (state, { account }) => ({
    ...state,
    loggedUser: account
  })),
);

export function reducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
