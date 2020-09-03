import {createAction, props} from "@ngrx/store";
import {Supplier} from "../../../../api/models/supplier";

export const loadSuppliersPage = createAction('[Supplier] Load Suppliers Page', props<{}>());
export const loadSuppliersPageSuccess = createAction('[Supplier] Load Suppliers Page Success', props<{suppliers: Array<Supplier>}>());
export const loadSuppliersPageFailure = createAction('[Supplier] Load Suppliers Page Failure', props<{error: any}>());

export const createSupplier = createAction('[Supplier] Create Supplier', props<{supplier: Supplier}>());
export const createSupplierSuccess = createAction('[Supplier] Create Supplier Success', props<{supplier: Supplier}>());
export const createSupplierFailure = createAction('[Supplier] Create Supplier Failure', props<{error: any}>());
