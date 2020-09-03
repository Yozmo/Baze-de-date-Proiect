import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AdminAppState, getPharmacies, getPharmacy} from "../../state";
import {Observable, Subscription} from "rxjs";
import {Pharmacy} from "../../../../api/models/pharmacy";
import {createPharmacy, loadPharmacyForCustomer, loadPharmacyPage} from "../../state/pharmacy/pharmacy.action";
import {MatDialog} from "@angular/material/dialog";
import {PharmacyDialogComponent} from "../../containers/pharmacy-dialog/pharmacy-dialog.component";

import * as AuthState from '../../../auth/state/auth.state';
import * as AuthSelectors from '../../../auth/state/auth.selectors';
import {Account} from "../../../../api/models/account";

@Component({
  selector: 'pharmacy-general',
  templateUrl: './pharmacy-general.component.html',
  styleUrls: ['./pharmacy-general.component.scss']
})
export class PharmacyGeneralComponent implements OnInit, OnDestroy {

  public pharmacies$: Observable<Array<Pharmacy>>;
  public pharmacy$: Observable<Pharmacy>;

  private loggedUser$: Observable<Account>;
  public loggedUser: Account;
  private subscriptions$: Array<Subscription> = [];

  constructor(
    private store: Store<AdminAppState & AuthState.State>,
    private dialog: MatDialog,
  ) {
    this.loggedUser$ = this.store.pipe(select(AuthSelectors.selectLoggedUser));
    this.subscriptions$.push(this.loggedUser$.subscribe(data => {
      this.loggedUser = data;
    }));
  }

  ngOnInit() {
    if (this.loggedUser.roles.includes('admin')) {

      this.store.dispatch(loadPharmacyPage({}));

      this.pharmacies$ = this.store.select(getPharmacies);

    } else {
      let name: string = this.loggedUser.email.split('@')[0];

      this.store.dispatch(loadPharmacyForCustomer({ name }));
      this.pharmacy$ = this.store.select(getPharmacy);

    }
  }

  createPharmacy() {
    const dialogRef = this.dialog.open(PharmacyDialogComponent, {
      width: '500px',
      data: {
        pharmacy: {
          name: '',
          pharmacyType: '',
          supplierIds: []
        },
        times: Date.now()
      }
    });
    dialogRef.afterClosed().subscribe((newPharmacy: Pharmacy) => {
      if (newPharmacy) {
        this.store.dispatch(createPharmacy({newPharmacy}));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions$) {
      this.subscriptions$.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
  }

  btoa(id: number) {
    return btoa(String(id));
  }
}
