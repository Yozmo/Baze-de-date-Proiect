import {createAction, props} from "@ngrx/store";
import {Pharmacy} from "../../../../api/models/pharmacy";

export const loadPharmacyPage = createAction('[Admin] Load Pharmacy Page', props<{}>());
export const loadPharmacyPageSuccess = createAction('[Admin] Load Pharmacy Page Success', props<{pharmacies: Array<Pharmacy>}>());
export const loadPharmacyPageFailure = createAction('[Admin] Load Pharmacy Page Failure', props<{error: any}>());


export const createPharmacy = createAction('[Admin] Create Pharmacy', props<{newPharmacy: Pharmacy}>());
export const createPharmacySuccess = createAction('[Admin] Create Pharmacy Success', props<{newPharmacy: Pharmacy}>());
export const createPharmacyFailure = createAction('[Admin] Create Pharmacy Failure', props<{error: any}>());

export const loadPharmacyForCustomer = createAction('[Admin] Load Pharmacy For Customer', props<{name: string}>());
export const loadPharmacyForCustomerSuccess = createAction('[Admin] Load Pharmacy For Customer Success', props<{pharmacy: Pharmacy}>());
export const loadPharmacyForCustomerFailure = createAction('[Admin] Load Pharmacy For Customer Failure', props<{error: any}>());
