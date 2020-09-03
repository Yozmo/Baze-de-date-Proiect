import * as AppState from '../../../state/app.state';
import * as fromPharmacy from './pharmacy/pharmacy.reducer';
import * as fromCenter from './center/center.reducer';
import * as fromDrug from './drug/drug.reducer';
import * as fromAccount from './account/account.reducer';
import {Action, combineReducers, createFeatureSelector, createSelector} from "@ngrx/store";

export const adminFeatureKey = 'admin';

export interface AdminState {
  [fromPharmacy.pharmacyFeatureKey]: fromPharmacy.State;
  [fromCenter.centerFeatureKey]: fromCenter.State;
  [fromDrug.drugFeatureKey]: fromDrug.State;
  [fromAccount.accountFeatureKey]: fromAccount.State;

}

export interface AdminAppState extends AppState.State {
  [adminFeatureKey]: AdminState;
}

export function reducers(state: AdminState | undefined, action: Action) {
  return combineReducers({
    [fromPharmacy.pharmacyFeatureKey]: fromPharmacy.reducer,
    [fromCenter.centerFeatureKey]: fromCenter.reducer,
    [fromDrug.drugFeatureKey]: fromDrug.reducer,
    [fromAccount.accountFeatureKey]: fromAccount.reducer,
  })(state, action);
}

export const selectAdminState = createFeatureSelector<AdminAppState, AdminState>(
  adminFeatureKey
);

// Pharmacy
export const selectPharmacyEntityState = createSelector(
  selectAdminState,
  (state: AdminState) => state[fromPharmacy.pharmacyFeatureKey]
);

export const getPharmacies = createSelector(
  selectPharmacyEntityState,
  fromPharmacy.getPharmacies
);

export const getPharmacy = createSelector(
  selectPharmacyEntityState,
  fromPharmacy.getPharmacy
)

// Center
export const selectCenterEntityState = createSelector(
  selectAdminState,
  (state: AdminState) => state[fromCenter.centerFeatureKey]
);

export const getCenters = createSelector(
  selectCenterEntityState,
  fromCenter.getCenters
);

export const getPharmacyCenters = createSelector(
  selectCenterEntityState,
  fromCenter.getPharmacyCenters
);

// Drug

export const selectDrugEntityState = createSelector(
  selectAdminState,
  (state: AdminState) => state[fromDrug.drugFeatureKey]
);

export const getDrugs = createSelector(
  selectDrugEntityState,
  fromDrug.getDrugs
);

// Account

export const selectAccountEntityState = createSelector(
  selectAdminState,
  (state: AdminState) => state[fromAccount.accountFeatureKey]
);

export const getAccounts = createSelector(
  selectAccountEntityState,
  fromAccount.getAccounts
);
