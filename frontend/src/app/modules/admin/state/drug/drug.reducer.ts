import {Drug} from "../../../../api/models/drug";
import {createReducer, on} from "@ngrx/store";
import {createDrugSuccess, loadDrugPageSuccess, updateDrugSuccess} from "./drug.actions";
import produce from "immer";


export const drugFeatureKey = 'drug';

export interface State {
  drugs: Array<Drug>;
}

export const initialState: State = {
  drugs: null,
}

export const reducer = createReducer(
  initialState,
  on(loadDrugPageSuccess,
    (state, {drugs}) => ({
      ...state,
      drugs: drugs
    })
  ),
  on(createDrugSuccess,
    (state, {newDrug}) => produce(state, draftState => {
      const drugs: Array<Drug> = JSON.parse(JSON.stringify(state.drugs));
      drugs.push(newDrug);

      return {
        ...draftState,
        drugs: drugs
      }
    })
  ),
  on(updateDrugSuccess,
    (state, {updatedDrug}) => produce(state, draftState => {
      const drugs: Array<Drug> = JSON.parse(JSON.stringify(state.drugs));
      for (let index = 0; index < drugs.length; ++index) {
        const element = drugs[index];
        if (element.id === updatedDrug.id) {
          drugs[index] = updatedDrug;
        }
      }
      return {
        ...draftState,
        drugs: drugs
      }
    })
  )
);

export const getDrugs = (state: State) => state.drugs;
