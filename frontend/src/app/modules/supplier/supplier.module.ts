import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import {MaterialModule} from "../../material";
import {CoreModule} from "../../core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SuppliersTableComponent } from './containers/suppliers-table/suppliers-table.component';

import * as SupplierProjectState from './state';
import {SuppliersEffects} from "./state/suppliers/suppliers.effects";
import {SupplierService} from "./services/supplier.service";
import {DrugService} from "./services/drug.service";

@NgModule({
  declarations: [SuppliersComponent, SuppliersTableComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule,
    MatTooltipModule,
    StoreModule.forFeature(SupplierProjectState.supplierFeatureKey, SupplierProjectState.reducers),
    EffectsModule.forFeature([
      SuppliersEffects,
    ]),
  ],
  providers: [
    SupplierService,
    DrugService
  ],
  entryComponents: []
})
export class SupplierModule { }
