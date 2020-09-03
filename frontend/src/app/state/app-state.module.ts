import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import * as appReducer from './app.reducer';
import {RouterEffects} from "../core/state/router.effects";


export const COMPONENTS = [
  StoreModule.forRoot(appReducer.ROOT_REDUCERS, {
    metaReducers: appReducer.metaReducers,
    runtimeChecks: {
      strictStateImmutability: true,
    }
  }),
  EffectsModule.forRoot([RouterEffects]),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
];

@NgModule({
  imports: COMPONENTS,
  declarations: [],
})
export class StateModule {}
