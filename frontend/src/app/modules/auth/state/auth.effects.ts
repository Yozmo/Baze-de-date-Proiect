import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Credentials, OAuth2AccessToken, User } from '../models';
import { getLoggedUser, getLoggedUserFailure, getLoggedUserSuccess, login, loginFailure, loginRedirect, loginSuccess, logout, logoutConfirmation, logoutConfirmationDismiss, refreshToken, refreshTokenSuccess, reloadToken, resetPasswordSuccess, resetPasswordFailure, resetPassword, updateAccount, updateAccountSuccess, updateAccountFailure } from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import * as AuthState from './auth.state';
import * as UserActions from '../../../core/state/user.actions';
import {AuthService} from "../services/auth.service";
import {AccountService} from "../services/account.service";
import {Account} from "../../../api/models";
import {LogoutConfirmationDialogComponent} from "../components/logout-confirmation-dialog/logout-confirmation-dialog.component";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      map(action => action.credentials),
      exhaustMap((auth: Credentials) =>
        this.authService.login(auth).pipe(
          map(oAuth2AccessToken => loginSuccess({ oAuth2AccessToken, credentials: auth })),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.store$.dispatch(getLoggedUser());
        })
      ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginRedirect, logout),
        tap(authed => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          LogoutConfirmationDialogComponent,
          undefined,
          boolean
          >(LogoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map(
        result =>
          result
            ? logout()
            : logoutConfirmationDismiss()
      )
    )
  );

  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => logout())
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshToken),
      withLatestFrom(this.store$.select(AuthSelectors.selectOAuth2AccessToken)),
      switchMap(([action, auth]: [Action, OAuth2AccessToken]) => {
        if (!auth) {
          return of(logout());
        }
        return this.authService.refreshToken(auth.refresh_token).pipe(
          map(oAuth2AccessToken => refreshTokenSuccess({ oAuth2AccessToken })),
          catchError(error => of(reloadToken()))
        );
      })
    )
  );

  reloadToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reloadToken),
      withLatestFrom(this.store$.select(AuthSelectors.selectRememberMe)),
      withLatestFrom(this.store$.select(AuthSelectors.selectUser)),
      switchMap(([[action, rememberMe], user]: [[Action, boolean], User]) =>
        rememberMe ? this.authService.login({ username: user.name, password: user.password, rememberMe: true }).pipe(
          map(oAuth2AccessToken => refreshTokenSuccess({ oAuth2AccessToken })),
          catchError(error => of(logout()))
        ) : of(logout())
      ),
    )
  );

  getLoggedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLoggedUser),
      withLatestFrom(this.store$.select(AuthSelectors.selectOAuth2AccessToken)),
      withLatestFrom(this.store$.select(AuthSelectors.selectUser)),
      exhaustMap(([[action, auth], user]: [[Action, OAuth2AccessToken], User]) => {
        if (auth == null) {
          return of(getLoggedUserFailure({ error: 'no user logged' }));
        }
        if (auth.roles.includes('ROLE_ADMIN')) {
          return this.authService.getAccountByEmail(user.name).pipe(
            map((account: Account) => {
              this.router.navigate(['/admin/pharmacies']);
              return getLoggedUserSuccess({ user: account });
            }),
            catchError((error) => of(getLoggedUserFailure({ error })))
          );
        } else {
          return this.authService.getAccountByEmail(user.name).pipe(
            map((account: Account) => {
              this.router.navigate(['/admin/pharmacies']);
              return getLoggedUserSuccess({ user: account });
            }),
            catchError((error) => of(getLoggedUserFailure({ error })))
          );
        }
      }),
    )
  );

  updateAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAccount),
      switchMap((action) =>
        this.accountService.updateAccount(action.account).pipe(
          map(() => updateAccountSuccess({ account: action.account })),
          catchError((error) => of(updateAccountFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    private dialog: MatDialog,
    private store$: Store<AuthState.State>,
  ) { }
}
