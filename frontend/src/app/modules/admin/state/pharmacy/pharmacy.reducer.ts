import {Pharmacy} from "../../../../api/models/pharmacy";
import {createReducer, on} from "@ngrx/store";
import {createPharmacySuccess, loadPharmacyForCustomerSuccess, loadPharmacyPageSuccess} from "./pharmacy.action";
import produce from "immer";

export const pharmacyFeatureKey = 'pharmacy';

export interface State {
  pharmacies: Array<Pharmacy>
  pharmacy: Pharmacy
}

export const initialState: State = {
  pharmacies: null,
  pharmacy: null
}

export const reducer = createReducer(
  initialState,
  on(loadPharmacyPageSuccess,
    (state, {pharmacies}) => ({
      ...state,
      pharmacies: pharmacies
    })
  ),
  on(createPharmacySuccess,
    (state, {newPharmacy}) => produce(state, draftState => {
      const pharmacyList: Array<Pharmacy> = JSON.parse(JSON.stringify(state.pharmacies));
      pharmacyList.push(newPharmacy);
      return {
        ...draftState,
        pharmacies: pharmacyList
      }
    })
  ),
  on(loadPharmacyForCustomerSuccess,
    (state, {pharmacy}) => ({
      ...state,
      pharmacy: pharmacy
    })
  )
);

export const getPharmacies = (state: State) => state.pharmacies;
export const getPharmacy = (state: State) => state.pharmacy;
