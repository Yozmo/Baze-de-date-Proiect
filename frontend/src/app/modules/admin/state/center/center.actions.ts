import {createAction, props} from "@ngrx/store";
import {Center} from "../../../../api/models/center";
import {Stock} from "../../../../api/models/stock";

export const loadCenterPage = createAction('[Admin / Farmacii] Load Center Page', props<{}>());
export const loadCenterPageSuccess = createAction('[Admin / Farmacii] Load Center Pace Success', props<{centers: Array<Center>}>());
export const loadCenterPageFailure = createAction('[Admin / Farmacii] Load Center Pace Failure', props<{error: any}>());

export const loadCentersForPharmacy = createAction('[Admin / Farmacii] Load Centers for Pharmacy', props<{pharmacyId: string}>());
export const loadCentersForPharmacySuccess = createAction('[Admin / Farmacii] Load Centers for Pharmacy Success ', props<{centers: Array<Center>}>());
export const loadCentersForPharmacyFailure = createAction('[Admin] Load Centers for Pharmacy Failure', props<{error: any}>());

export const createCenter = createAction('[Admin / Farmacii] Create Center', props<{newCenter: Center}>());
export const createCenterSuccess = createAction('[Admin / Farmacii] Create Center Success', props<{newCenter: Center}>());
export const createCenterFailure = createAction('[Admin / Farmacii] Create Center Failure', props<{error: any}>());

export const loadCenterStock = createAction('[Admin / Farmacii] Load Center Stock', props<{centerId: string}>());
export const loadCenterStockSuccess = createAction('[Admin / Farmacii] Load Center Stock Success', props<{stocks: Array<Stock>}>());
export const loadCenterStockFailure = createAction('[Admin / Farmacii] Load Center Stock', props<{error: any}>());

export const updateCenter = createAction('[Admin / Farmacii] Update Center', props<{updatedCenter: Center}>());
export const updateCenterSuccess = createAction('[Admin / Farmacii] Update Center Success', props<{updatedCenter: Center}>());
export const updateCenterFailure = createAction('[Admin / Farmacii] Update Center Failure', props<{error: any}>());
