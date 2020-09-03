import {createAction, props} from "@ngrx/store";
import {Drug} from "../../../../api/models/drug";

export const loadDrugPage = createAction('[Admin / Medicamente] Load Drug Page', props<{}>());
export const loadDrugPageSuccess = createAction('[Admin / Medicamente] Load Drug Page Success', props<{drugs: Array<Drug>}>());
export const loadDrugPageFailure = createAction('[Admin / Medicamente] Load Drug Page Failure', props<{error: any}>());

export const createDrug = createAction('[Admin / Medicamente] Create Drug', props<{newDrug: Drug}>());
export const createDrugSuccess = createAction('[Admin / Medicamente] Create Drug Success', props<{newDrug: Drug}>());
export const createDrugFailure = createAction('[Admin / Medicamente] Create Drug Failure', props<{error: any}>());

export const updateDrug = createAction('[Admin / Medicamente] Update Drug', props<{updatedDrug: Drug}>());
export const updateDrugSuccess = createAction('[Admin / Medicamente] Update Drug Success', props<{updatedDrug: Drug}>());
export const updateDrugFailure = createAction('[Admin / Medicamente] Update Drug Failure', props<{error: any}>());
