import {Center} from "../../../../api/models/center";
import {createReducer, on} from "@ngrx/store";
import {
  createCenterSuccess,
  loadCenterPageSuccess,
  loadCentersForPharmacySuccess,
  loadCenterStockSuccess,
  updateCenterSuccess
} from "./center.actions";
import {Stock} from "../../../../api/models/stock";
import produce from "immer";

export const centerFeatureKey = 'center';

export interface State {
  centers: Array<Center>,
  pharmacyCenters: Array<Center>,
  stocks: Array<Stock>
}

export const initialState: State = {
  centers: null,
  pharmacyCenters: null,
  stocks: null
}

export const reducer = createReducer(
  initialState,
  on(loadCenterPageSuccess,
    (state, {centers}) => ({
      ...state,
      centers: centers
    })
  ),
  on(loadCentersForPharmacySuccess,
    (state, {centers}) => ({
      ...state,
      pharmacyCenters: centers
    })
  ),
  on(loadCenterStockSuccess,
    (state, {stocks}) => ({
      ...state,
      stocks: stocks
    })
  ),
  on(updateCenterSuccess,
    (state, {updatedCenter}) => produce(state, draftState => {
      const pharmacyCenters: Array<Center> = JSON.parse(JSON.stringify(state.pharmacyCenters));
      for (let index = 0; index < pharmacyCenters.length; ++index) {
        const element = pharmacyCenters[index];
        if (element.id === updatedCenter.id) {
          pharmacyCenters[index] = updatedCenter;
        }
      }
      return {
        ...draftState,
        pharmacyCenters: pharmacyCenters
      }
    })
  ),
  on(createCenterSuccess,
    (state, {newCenter}) => produce(state, draftState => {
      const pharmacyCenters: Array<Center> = JSON.parse(JSON.stringify(state.pharmacyCenters));
      pharmacyCenters.push(newCenter);
      return {
        ...draftState,
        pharmacyCenters: pharmacyCenters
      }
    })
  )
);

export const getCenters = (state: State) => state.centers;
export const getPharmacyCenters = (state: State) => state.pharmacyCenters;
export const getCenterStocks = (state: State) => state.stocks;
