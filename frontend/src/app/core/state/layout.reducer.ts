import { createReducer, on } from '@ngrx/store';

import * as layoutActions from './layout.actions';
import * as layoutState from './layout.state';



export const reducer = createReducer(
  layoutState.initialState,
  on(layoutActions.closeSidenav, state => ({ showSidenav: false })),
  on(layoutActions.openSidenav, state => ({ showSidenav: true }))
);

export const selectShowSidenav = (state: layoutState.State) => state.showSidenav;
