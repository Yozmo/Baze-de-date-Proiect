import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as AuthActions from '../state/auth.actions';
import * as AuthState from '../state/auth.state';
import * as AuthSelectors from '../state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(AuthSelectors.selectLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(AuthActions.loginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
