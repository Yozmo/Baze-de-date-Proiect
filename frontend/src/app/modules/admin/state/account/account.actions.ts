import {createAction, props} from "@ngrx/store";
import {Account} from "../../../../api/models/account";

export const loadAccountsPage = createAction('[Admin / Accounts] Load Accounts Page', props<{}>());
export const loadAccountsPageSuccess = createAction('[Admin / Accounts] Load Accounts Page Success', props<{accounts: Array<Account>}>());
export const loadAccountsPageFailure = createAction('[Admin / Accounts] Load Accounts Page Failure', props<{error: any}>());

export const createAccount = createAction('[Admin / Accounts] Create Account', props<{account: Account}>());
export const createAccountSuccess = createAction('[Admin / Accounts] Create Account Success', props<{account: Account}>());
export const createAccountFailure = createAction('[Admin / Accounts] Create Account Failure', props<{error: any}>());

export const updateAccount = createAction('[Admin / Accounts] Update Account]', props<{updatedAccount: Account}>());
export const updateAccountSuccess = createAction('[Admin / Accounts] Update Account Success]', props<{updatedAccount: Account}>());
export const updateAccountFailure = createAction('[Admin / Accounts] Update Account Failure]', props<{error: any}>());
