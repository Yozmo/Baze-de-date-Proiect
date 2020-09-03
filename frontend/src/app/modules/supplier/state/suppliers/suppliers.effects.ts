import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {SupplierService} from "../../services/supplier.service";
import {AlertService} from "../../../../core/services/alert.service";
import {loadSuppliersPage, loadSuppliersPageFailure, loadSuppliersPageSuccess} from "./supplier.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {Supplier} from "../../../../api/models/supplier";
import {EMPTY, of} from "rxjs";

@Injectable()
export class SuppliersEffects {

  loadSuppliersPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSuppliersPage),
      switchMap(() =>
        this.supplierService.getAllSuppliers().pipe(
          map((suppliers: Array<Supplier>) => loadSuppliersPageSuccess({ suppliers })),
          catchError((error) => of(loadSuppliersPageFailure({ error })))
        )
      )
    )
  );

  loadSuppliersPageFailureError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSuppliersPageFailure),
      switchMap(({error}) => {
        if(error.status) {
          this.alertService.error('S-a produs o eroare la incarcarea furnizorilor');
        }
        return EMPTY;
      })
    )
  );

  constructor(
    private actions$: Actions,
    private supplierService: SupplierService,
    private alertService: AlertService
  ) {
  }
}
