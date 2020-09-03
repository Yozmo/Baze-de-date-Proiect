import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { authFeatureKey, AuthState, State } from './auth.state';

export const getUser = (state: AuthState) => state.user;
export const getOAuth2AccessToken = (state: AuthState) => state.oAuth2AccessToken;
export const getError = (state: AuthState) => state.error;
export const getPending = (state: AuthState) => state.pending;
export const getLoggedUser = (state: AuthState) => state.loggedUser;
export const getRememberMe = (state: AuthState) => state.rememberMe;


export const selectAuthState = createFeatureSelector<State, AuthState>(
  authFeatureKey
);

export const selectUser = createSelector(
  selectAuthState,
  getUser
);
export const selectOAuth2AccessToken = createSelector(
  selectAuthState,
  getOAuth2AccessToken
);
export const selectLoggedIn = createSelector(selectOAuth2AccessToken, oAuth2AccessToken => !!oAuth2AccessToken);

export const selectLoginPageError = createSelector(
  selectAuthState,
  getError
);

export const selectLoginPagePending = createSelector(
  selectAuthState,
  getPending
);

export const selectLoggedUser = createSelector(
  selectAuthState,
  getLoggedUser
);

export const selectRememberMe = createSelector(
  selectAuthState,
  getRememberMe
);
