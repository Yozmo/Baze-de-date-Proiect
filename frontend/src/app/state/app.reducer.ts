import {Action, ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from "@ngrx/store";
import {storeLogger} from "ngrx-store-logger";
import {localStorageSync} from "ngrx-store-localstorage";
import {storeFreeze} from "ngrx-store-freeze";
import * as fromRouter from '@ngrx/router-store';
import {InjectionToken} from "@angular/core";


import * as AppState from './app.state';
import * as AuthActions from '../modules/auth/state/auth.actions';
import * as LayoutState from '../core/state/layout.state';
import * as fromLayout from '../core/state/layout.reducer';
import * as AuthReducers from '../modules/auth/state/auth.reducer';
import * as AuthState from '../modules/auth/state/auth.state';



export function clearState(reducer) {
  return (state, action) => {
    if (action.type === AuthActions.logout.type) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export function logger(reducer: ActionReducer<AppState.State>): any {
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [{ [AuthState.authFeatureKey]: ['user', 'oAuth2AccessToken', 'loggedUser', 'rememberMe'] }], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<any>[] = [logger, storeFreeze, localStorageSyncReducer, clearState];

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<AppState.State, Action>
  >('Root reducers token', {
  factory: () => ({
    [AuthState.authFeatureKey]: AuthReducers.reducer,
    [LayoutState.layoutFeatureKey]: fromLayout.reducer,
    router: fromRouter.routerReducer,
  }),
});

export const selectLayoutState = createFeatureSelector<AppState.State, LayoutState.State>(
  LayoutState.layoutFeatureKey
);

export const selectShowSidenav = createSelector(
  selectLayoutState,
  fromLayout.selectShowSidenav
);
