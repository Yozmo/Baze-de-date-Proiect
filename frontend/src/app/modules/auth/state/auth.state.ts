import * as AppState from '../../../state/app.state';
import { OAuth2AccessToken, User } from '../models';
import {Account} from "../../../api/models";

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined;
  oAuth2AccessToken: OAuth2AccessToken | undefined;
  error: string | undefined;
  pending: boolean;
  isReseller: boolean;
  loggedUser: Account;
  rememberMe: boolean;
}

export const initialState: AuthState = {
  user: null,
  oAuth2AccessToken: null,
  error: null,
  pending: false,
  isReseller: false,
  loggedUser: null,
  rememberMe: false
};

export interface State extends AppState.State {
  [authFeatureKey]: AuthState;
}
