import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Credentials, User } from '../../models';
import * as AuthActions from '../../state/auth.actions';
import * as AuthSelectors from '../../state/auth.selectors';
import { selectLoggedIn } from '../../state/auth.selectors';
import * as AuthState from '../../state/auth.state';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit, OnDestroy {
  pending$ = this.store.pipe(select(AuthSelectors.selectLoginPagePending));
  error$ = this.store.pipe(select(AuthSelectors.selectLoginPageError));
  isLoggedIn$ = this.store.pipe(select(selectLoggedIn));
  user: User;
  private subscriptions: Array<Subscription> = [];

  constructor(private store: Store<AuthState.State>) {
  }

  ngOnInit() {
    this.subscriptions.push(this.isLoggedIn$.subscribe((isLoggedIn) => {
      this.store.dispatch(AuthActions.getLoggedUser());
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  onSubmit(credentials: Credentials) {
    this.store.dispatch(AuthActions.login({ credentials }));
  }

  resetPassword(email: string) {
    this.store.dispatch(AuthActions.resetPassword({ email }));
  }
}
