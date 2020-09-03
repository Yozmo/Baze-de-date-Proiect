import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {User} from "../../../modules/auth/models";
import {Account} from "../../../api/models/account";
import {select, Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";

import * as AuthActions from '../../../modules/auth/state/auth.actions';
import * as AuthSelectors from '../../../modules/auth/state/auth.selectors';
import * as AuthState from '../../../modules/auth/state/auth.state';
import * as appReducer from '../../../state/app.reducer';
import * as appState from '../../../state/app.state';
import * as LayoutActions from '../../state/layout.actions';
import {map} from "rxjs/operators";
import {EditUserProfileDialogComponent} from "../../../modules/auth/components/edit-user-profile-dialog/edit-user-profile-dialog.component";

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  user$: Observable<User>;
  loggedUser$: Observable<Account>;
  loggedUser: Account;
  burgerShow: boolean = false;
  isAdmin$: Observable<boolean>;

  constructor(
    private store: Store<appState.State & AuthState.State>,
    private dialog: MatDialog,
  ) {
    this.showSidenav$ = this.store.pipe(select(appReducer.selectShowSidenav));
    this.loggedIn$ = this.store.pipe(select(AuthSelectors.selectLoggedIn));
    this.user$ = this.store.pipe(select(AuthSelectors.selectUser));
    this.loggedUser$ = this.store.pipe(select(AuthSelectors.selectLoggedUser));
    this.loggedUser$.subscribe((user: any) => this.loggedUser = user);
    this.isAdmin$ = this.store.pipe(select(AuthSelectors.selectOAuth2AccessToken), map(user => user && user.roles && user.roles.includes('ROLE_ADMIN')));
  }

  closeSidenav() {
    this.burgerShow = false;
  }

  openSidenav() {
    this.store.dispatch(LayoutActions.openSidenav());
  }

  logout() {
    this.closeSidenav();

    this.store.dispatch(AuthActions.logoutConfirmation());
  }

  editUserProfile() {
    let password: string = '';

    this.user$.subscribe(user => {
      password = user.password;
    });

    const dialogRef = this.dialog.open(EditUserProfileDialogComponent, {
      width: '300px',
      data: {
        email: this.loggedUser.email,
        id: this.loggedUser.id,
        name: this.loggedUser.name,
        password: password,
        profilePicture: this.loggedUser.profilePicture,
        country: this.loggedUser.country,
        county: this.loggedUser.county,
        roles: this.loggedUser.roles
      }
    });
    dialogRef.afterClosed().subscribe((account) => {
      if (account) {
        this.store.dispatch(AuthActions.updateAccount({ account }));
      }
    });
  }


}
