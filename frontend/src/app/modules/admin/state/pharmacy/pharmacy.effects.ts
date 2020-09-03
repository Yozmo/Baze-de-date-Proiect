import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PharmacyService} from "../../services/pharmacy.service";
import {
  createPharmacy,
  createPharmacyFailure,
  createPharmacySuccess, loadPharmacyForCustomer, loadPharmacyForCustomerFailure, loadPharmacyForCustomerSuccess,
  loadPharmacyPage,
  loadPharmacyPageFailure,
  loadPharmacyPageSuccess
} from "./pharmacy.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {Pharmacy} from "../../../../api/models/pharmacy";
import {EMPTY, of} from "rxjs";
import {AlertService} from "../../../../core/services/alert.service";

@Injectable()
export class PharmacyEffects {

  loadPharmaciesPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPharmacyPage),
      switchMap(() =>
        this.pharmacyService.getAllPharmacies().pipe(
          map((pharmacies: Array<Pharmacy>) => loadPharmacyPageSuccess({pharmacies})),
          catchError((error) => of(loadPharmacyPageFailure({error})))
        )
      )
    )
  );

  loadPharmaciesPageFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPharmacyPageFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea farmaciilor');
        }
        return EMPTY;
      })
    )
  );

  createPharmacy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPharmacy),
      switchMap((action) =>
        this.pharmacyService.createPharmacy(action.newPharmacy).pipe(
          map((newPharmacy: Pharmacy) => createPharmacySuccess({newPharmacy})),
          catchError((error) => of(createPharmacyFailure({error})))
        )
      )
    )
  );

  createPharmacyFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPharmacyFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la creearea farmaciei');
        }
        return EMPTY;
      })
    )
  );

  loadPharmacyForCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPharmacyForCustomer),
      switchMap((action) =>
        this.pharmacyService.getPharmacyByName(action.name).pipe(
          map((pharmacy: Pharmacy) => loadPharmacyForCustomerSuccess({ pharmacy })),
          catchError((error) => of(loadPharmacyForCustomerFailure({ error })))
        )
      )
    )
  );

  loadPharmacyForCustomerFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPharmacyForCustomerFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea farmaciei');
        }
        return EMPTY;
      })
    )
  );

  constructor(
    private actions$: Actions,
    private pharmacyService: PharmacyService,
    private alertService: AlertService
  ) {
  }
}
