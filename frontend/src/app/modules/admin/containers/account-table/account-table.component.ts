import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Account} from "../../../../api/models/account";
import {select, Store} from "@ngrx/store";
import {AdminAppState, getAccounts} from "../../state";
import {MatDialog} from "@angular/material/dialog";
import {createAccount, loadAccountsPage} from "../../state/account/account.actions";
import {filter, map} from "rxjs/operators";
import {AccountDialogComponent} from "../account-dialog/account-dialog.component";
import {updateAccount} from "../../../auth/state/auth.actions";

import * as AuthState from '../../../auth/state/auth.state';
import * as AuthSelectors from '../../../auth/state/auth.selectors';


@Component({
  selector: 'account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public accounts$: Observable<MatTableDataSource<Account>>;
  public displayedColumns: string[] = [
    'name',
    'email',
    'roles',
    'country',
    'county'
  ];
  public isLoading: boolean = true;

  private loggedUser$: Observable<Account>;
  public loggedUser: Account;
  private subscriptions$: Array<Subscription> = [];

  constructor(
    private store: Store<AdminAppState & AuthState.State>,
    public dialog: MatDialog
  ) {
    this.loggedUser$ = this.store.pipe(select(AuthSelectors.selectLoggedUser));
    this.subscriptions$.push(this.loggedUser$.subscribe(data => {
      this.loggedUser = data;
    }));
  }

  ngOnInit() {
    this.store.dispatch(loadAccountsPage({}));
    this.isLoading = true;
    this.accounts$ = this.store.pipe(
      select(getAccounts),
      filter(accounts => accounts !== null),
      map(accounts => {
        this.isLoading = false;
        const accountData = new MatTableDataSource<Account>(accounts);
        accountData.paginator = this.paginator;
        accountData.sort = this.sort;
        return accountData;
      })
    )
  }

  editAccount(editAccount: Account) {
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '500px',
      data: {
        editMode: true,
        account: {
          name: editAccount.name || '',
          email: editAccount.email || '',
          roles: editAccount.roles || [],
          country: editAccount.country || '',
          county: editAccount.county || ''
        } as Account
      }
    });
    dialogRef.afterClosed().subscribe((account) => {
      if (account) {
        account.id = editAccount.id;
        this.store.dispatch(updateAccount({ account }));
      }
    });
  }

  createAccount() {
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '500px',
      data: {
        account: {
          name: '',
          email: '',
          roles: [],
          country: '',
          county: '',
        } as Account
      }
    });
    dialogRef.afterClosed().subscribe((account) => {
      if (account) {
        this.store.dispatch(createAccount({account}));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions$) {
      this.subscriptions$.forEach(subscription => {
        subscription.unsubscribe();
      })
    }
  }

}
