import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AccountService} from "../../services/account.service";
import {AlertService} from "../../../../core/services/alert.service";
import {
  createAccount, createAccountFailure,
  createAccountSuccess,
  loadAccountsPage,
  loadAccountsPageFailure,
  loadAccountsPageSuccess, updateAccount, updateAccountFailure, updateAccountSuccess
} from "./account.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {Account} from "../../../../api/models/account";
import {EMPTY, of} from "rxjs";

@Injectable()
export class AccountEffects {

  loadAccountsPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAccountsPage),
      switchMap(() =>
        this.accountService.getAllAccounts().pipe(
          map((accounts: Array<Account>) => loadAccountsPageSuccess({ accounts })),
          catchError((error) => of(loadAccountsPageFailure({ error })))
        )
      )
    )
  );

  loadAccountsPageFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAccountsPageFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea membrilor');
        }
        return EMPTY;
      })
    )
  );

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAccount),
      switchMap((action) =>
        this.accountService.createAccount(action.account).pipe(
          map((account: Account) => createAccountSuccess({ account })),
          catchError((error) => {
            if (error.status === 409) {
              this.alertService.error('Exista un cont cu adresa de email introdusa');
            } else {
              this.alertService.error(error.message);
            }
            return of(createAccountFailure({ error }));
          })
        )
      )
    )
  );

 updateAccount$ = createEffect(() =>
   this.actions$.pipe(
     ofType(updateAccount),
     switchMap((action) =>
       this.accountService.updateAccount(action.updatedAccount).pipe(
         map(() => updateAccountSuccess({ updatedAccount: action.updatedAccount })),
         catchError((error) => of(updateAccountFailure({ error })))
       )
     )
   )
 );

  updateAccountFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAccountFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea actualizarii contului');
        }
        return EMPTY;
      })
    )
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}
}
