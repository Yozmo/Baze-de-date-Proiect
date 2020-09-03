import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PharmacyGeneralComponent} from './components/pharmacy-general/pharmacy-general.component';
import {MaterialModule} from "../../material";
import {CoreModule} from "../../core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {MatTooltipModule} from "@angular/material/tooltip";

import * as AdminProjectState from './state/';
import {EffectsModule} from "@ngrx/effects";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminTabsComponent} from './components/admin-tabs/admin-tabs.component';
import {PharmaciesComponent} from './components/pharmacies/pharmacies.component';
import {PharmacyTableComponent} from './containers/pharmacy-table/pharmacy-table.component';
import {PharmacyEffects} from "./state/pharmacy/pharmacy.effects";
import {PharmacyService} from "./services/pharmacy.service";
import {CenterEffects} from "./state/center/center.effects";
import {CenterService} from "./services/center.service";
import {StockService} from "./services/stock.service";
import {CenterDialogComponent} from './containers/center-dialog/center-dialog.component';
import {DrugEffects} from "./state/drug/drug.effects";
import {DrugService} from "./services/drug.service";
import {DrugsComponent} from './components/drugs/drugs.component';
import {DrugTableComponent} from './containers/drug-table/drug-table.component';
import {DrugDialogComponent} from './containers/drug-dialog/drug-dialog.component';
import {AccountsComponent} from './components/accounts/accounts.component';
import {AccountTableComponent} from './containers/account-table/account-table.component';
import {AccountEffects} from "./state/account/account.effects";
import {AccountService} from "./services/account.service";
import {AccountDialogComponent} from './containers/account-dialog/account-dialog.component';
import { PharmacyDialogComponent } from './containers/pharmacy-dialog/pharmacy-dialog.component';
import {SupplierService} from "../supplier/services/supplier.service";

@NgModule({
  declarations: [PharmacyGeneralComponent, AdminTabsComponent, PharmaciesComponent, PharmacyTableComponent, CenterDialogComponent, DrugsComponent, DrugTableComponent, DrugDialogComponent, AccountsComponent, AccountTableComponent, AccountDialogComponent, PharmacyDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule,
    MatTooltipModule,
    StoreModule.forFeature(AdminProjectState.adminFeatureKey, AdminProjectState.reducers),
    EffectsModule.forFeature([
      PharmacyEffects,
      CenterEffects,
      DrugEffects,
      AccountEffects
    ]),
  ],
  providers: [
    PharmacyService,
    CenterService,
    StockService,
    DrugService,
    AccountService,
    SupplierService
  ],
  entryComponents: [
    CenterDialogComponent,
    DrugDialogComponent,
    AccountDialogComponent,
    PharmacyDialogComponent,
  ]
})
export class AdminModule {
}
