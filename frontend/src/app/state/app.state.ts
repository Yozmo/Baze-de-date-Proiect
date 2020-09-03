import * as fromRouter from '@ngrx/router-store';
import * as layoutState from '../core/state/layout.state';

export interface State {
  [layoutState.layoutFeatureKey]: layoutState.State;
  router: fromRouter.RouterReducerState;
}

