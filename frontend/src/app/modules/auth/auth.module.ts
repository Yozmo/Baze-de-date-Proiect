import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {EditUserProfileDialogComponent} from './components/edit-user-profile-dialog/edit-user-profile-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material";
import {StoreModule} from "@ngrx/store";


import * as AuthReducers from './state/auth.reducer';
import * as AuthState from './state/auth.state';
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./state/auth.effects";
import {LogoutConfirmationDialogComponent} from './components/logout-confirmation-dialog/logout-confirmation-dialog.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {LoginPageComponent} from './containers/login-page/login-page.component';


@NgModule({
  declarations: [EditUserProfileDialogComponent, LogoutConfirmationDialogComponent, LoginFormComponent, LoginPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature(AuthState.authFeatureKey, AuthReducers.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  entryComponents: [LogoutConfirmationDialogComponent, EditUserProfileDialogComponent],
})
export class AuthModule {
}
