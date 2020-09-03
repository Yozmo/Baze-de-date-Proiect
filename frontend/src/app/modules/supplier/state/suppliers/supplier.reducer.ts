import {Supplier} from "../../../../api/models/supplier";
import {createReducer, on} from "@ngrx/store";
import {createSupplierSuccess, loadSuppliersPageSuccess} from "./supplier.actions";
import produce from "immer";

export const supplierFeatureKey = 'supplier';

export interface State {
  suppliers: Array<Supplier>
}

export const initialState: State = {
  suppliers: null
}

export const reducer = createReducer(
  initialState,
  on(loadSuppliersPageSuccess,
    (state, {suppliers}) => ({
      ...state,
      suppliers: suppliers
    })
  ),
  on(createSupplierSuccess,
    (state, {supplier}) => produce(state, draftState => {
      const suppliers: Array<Supplier> = JSON.parse(JSON.stringify(state.suppliers));
      suppliers.push(supplier);
      return {
        ...draftState,
        suppliers: suppliers
      };
    })
  )
);

export const getSuppliers = (state: State) => state.suppliers;
