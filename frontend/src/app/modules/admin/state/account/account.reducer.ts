import {createReducer, on} from "@ngrx/store";
import {createAccountSuccess, loadAccountsPageSuccess, updateAccountSuccess} from "./account.actions";
import produce from "immer";
import {Account} from "../../../../api/models/account";

export const accountFeatureKey = 'account';

export interface State {
  accounts: Array<Account>;
}

export const initialState: State = {
  accounts: null
}

export const reducer = createReducer(
  initialState,
  on(loadAccountsPageSuccess,
    (state, {accounts}) => ({
      ...state,
      accounts: accounts
    })
  ),
  on(createAccountSuccess,
    (state, {account}) => produce(state, draftState => {
      if (account) {
        const accounts: Array<Account> = JSON.parse(JSON.stringify(state.accounts));
        accounts.push(account);
        return {
          ...draftState,
          accounts: accounts
        };
      } else {
        return {
          ...draftState
        };
      }
    })
  ),
  on(updateAccountSuccess,
    (state, {updatedAccount}) => produce(state, draftState => {
      if (updatedAccount) {
        const accounts: Array<Account> = JSON.parse(JSON.stringify(state.accounts));

        for (let index = 0; index < accounts.length; ++index) {
          const element = accounts[index];

          if (element.id === updatedAccount.id) {
            accounts[index] = updatedAccount;
            return {
              ...draftState,
              accounts: accounts
            };
          }
        }
        return {
          ...draftState,
          accounts: accounts
        };
      } else {
        return {
          ...draftState
        };
      }
    })
  )
);

export const getAccounts = (state: State) => state.accounts;
