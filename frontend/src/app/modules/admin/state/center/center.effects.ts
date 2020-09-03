import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CenterService} from "../../services/center.service";
import {AlertService} from "../../../../core/services/alert.service";
import {
  createCenter, createCenterFailure, createCenterSuccess,
  loadCenterPage,
  loadCenterPageFailure,
  loadCenterPageSuccess,
  loadCentersForPharmacy,
  loadCentersForPharmacyFailure,
  loadCentersForPharmacySuccess,
  loadCenterStock,
  loadCenterStockFailure,
  loadCenterStockSuccess,
  updateCenter, updateCenterFailure,
  updateCenterSuccess
} from "./center.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {Center} from "../../../../api/models/center";
import {EMPTY, of} from "rxjs";
import {StockService} from "../../services/stock.service";
import {Stock} from "../../../../api/models/stock";

@Injectable()
export class CenterEffects {

  loadCenterPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCenterPage),
      switchMap(() =>
        this.centerService.getAllCenters().pipe(
          map((centers: Array<Center>) => loadCenterPageSuccess({centers})),
          catchError((error) => of(loadCenterPageFailure({error})))
        )
      )
    )
  );

  loadCenterPageFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCenterPageFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea centrelor');
        }
        return EMPTY;
      })
    )
  );

  loadPharmacyCenters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCentersForPharmacy),
      switchMap((action) =>
        this.centerService.getCentersByPharmacyId(action.pharmacyId).pipe(
          map((pharmacyCenters: Array<Center>) => {
            console.log(pharmacyCenters);
            return loadCentersForPharmacySuccess({centers: pharmacyCenters})
          }),
          catchError((error) => of(loadCentersForPharmacyFailure({error})))
        )
      )
    )
  );

  loadPharmacyCentersFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCentersForPharmacyFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea centrelor pentru farmacie');
        }
        return EMPTY;
      })
    )
  );

  loadCenterStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCenterStock),
      switchMap((action) =>
        this.stockService.getStockForCenter(action.centerId).pipe(
          map((stocks: Array<Stock>) => loadCenterStockSuccess({ stocks })),
          catchError((error) => of(loadCenterStockFailure({ error })))
        )
      )
    )
  );

  loadCenterStocksFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCenterStockFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea stock-urilor pentru centru');
        }
        return EMPTY;
      })
    )
  );

  updateCenter$ = createEffect(() =>
    this.actions$.pipe(
     ofType(updateCenter),
     switchMap((action) =>
       this.centerService.updateCenter(action.updatedCenter).pipe(
         map(() => updateCenterSuccess({updatedCenter: action.updatedCenter})),
         catchError((error) => of(updateCenterFailure({error})))
       )
     )
    )
  );

  updateCenterFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCenterFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la updatarea centrului');
        }
        return EMPTY;
      })
    )
  );

  createCenter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCenter),
      switchMap((action) =>
        this.centerService.createCenter(action.newCenter).pipe(
          map((newCenter: Center) => createCenterSuccess({newCenter})),
          catchError((error) => of(createCenterFailure({error})))
        )
      )
    )
  );

  createCenterFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCenterFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la creearea centrului');
        }
        return EMPTY;
      })
    )
  );

  constructor(
    private actions$: Actions,
    private centerService: CenterService,
    private alertService: AlertService,
    private stockService: StockService
  ) {

  }
}
