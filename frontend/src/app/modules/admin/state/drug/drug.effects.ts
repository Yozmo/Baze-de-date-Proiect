import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DrugService} from "../../services/drug.service";
import {AlertService} from "../../../../core/services/alert.service";
import {
  createDrug,
  createDrugFailure,
  createDrugSuccess,
  loadDrugPage,
  loadDrugPageFailure,
  loadDrugPageSuccess, updateDrug, updateDrugFailure, updateDrugSuccess
} from "./drug.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {Drug} from "../../../../api/models/drug";
import {EMPTY, of} from "rxjs";

@Injectable()
export class DrugEffects {

  loadDrugPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDrugPage),
      switchMap(() =>
        this.drugService.getAllDrugs().pipe(
          map((drugs: Array<Drug>) => loadDrugPageSuccess({ drugs })),
          catchError((error) => of(loadDrugPageFailure({ error })))
        )
      )
    )
  );

  loadDrugPageFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDrugPageFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea medicamentelor');
        }
        return EMPTY;
      })
    )
  );

  createDrug$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createDrug),
      switchMap((action) =>
        this.drugService.createDrug(action.newDrug).pipe(
          map((newDrug: Drug) => createDrugSuccess({ newDrug })),
          catchError((error) => of(createDrugFailure({ error })))
        )
      )
    )
  );

  createDrugFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createDrugFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea creearea medicamentului');
        }
        return EMPTY;
      })
    )
  );

  updateDrug$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDrug),
      switchMap((action) =>
        this.drugService.updateDrug(action.updatedDrug).pipe(
          map(() => updateDrugSuccess({ updatedDrug: action.updatedDrug })),
          catchError((error) => of(updateDrugFailure({ error })))
        )
      )
    )
  );

  updateDrugFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDrugFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea modificarii medicamentului');
        }
        return EMPTY;
      })
    )
  );

  constructor(
    private actions$: Actions,
    private drugService: DrugService,
    private alertService: AlertService
  ) {
  }
}
