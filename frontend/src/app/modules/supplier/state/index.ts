import * as AppState from '../../../state/app.state';
import * as fromSupplier from './suppliers/supplier.reducer';
import {Action, combineReducers, createFeatureSelector, createSelector} from "@ngrx/store";

export const supplierFeatureKey = 'supplier';

export interface SupplierState {
  [fromSupplier.supplierFeatureKey]: fromSupplier.State;
}

export interface SupplierAppState extends AppState.State {
  [supplierFeatureKey]: SupplierState;
}

export function reducers(state: SupplierState | undefined, action: Action) {
  return combineReducers({
    [fromSupplier.supplierFeatureKey]: fromSupplier.reducer,
  })(state, action);
}

export const selectSupplierState = createFeatureSelector<SupplierAppState, SupplierState>(
  supplierFeatureKey
);

// Supplier

export const selectSupplierEntityState = createSelector(
  selectSupplierState,
  (state: SupplierState) => state[fromSupplier.supplierFeatureKey]
);

export const getSuppliers = createSelector(
  selectSupplierEntityState,
  fromSupplier.getSuppliers
);
