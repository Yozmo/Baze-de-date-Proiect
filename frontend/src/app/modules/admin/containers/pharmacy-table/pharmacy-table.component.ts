import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Center} from "../../../../api/models/center";
import {select, Store} from "@ngrx/store";
import {AdminAppState, getPharmacyCenters} from "../../state";
import {MatDialog} from "@angular/material/dialog";
import {filter, map} from "rxjs/operators";
import {createCenter, loadCentersForPharmacy} from "../../state/center/center.actions";
import {CenterDialogComponent} from "../center-dialog/center-dialog.component";
import {updateCenter} from "../../state/center/center.actions";
import {Account} from "../../../../api/models/account";

import * as AuthState from '../../../auth/state/auth.state';
import * as AuthSelectors from '../../../auth/state/auth.selectors';


@Component({
  selector: 'pharmacy-table',
  templateUrl: './pharmacy-table.component.html',
  styleUrls: ['./pharmacy-table.component.scss']
})
export class PharmacyTableComponent implements OnInit, OnDestroy, OnChanges {

  @Input() pharmacyId: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public displayedColumns: string[] = [
    'city',
    'county',
    'email',
    'phone',
    'street',
    'postalCode'
  ]
  public isLoading = true;
  public subscriptions$: Array<Subscription> = [];

  public centers$: Observable<MatTableDataSource<Center>>;

  private loggedUser$: Observable<Account>;
  private loggedUser: Account;


  constructor(
    private store: Store<AdminAppState & AuthState.State>,
    public dialog: MatDialog
  ) {
    this.loggedUser$ = this.store.pipe(select(AuthSelectors.selectLoggedUser));
    this.subscriptions$.push(this.loggedUser$.subscribe(data => {
      this.loggedUser = data;
    }));
  }

  ngOnInit() {
    this.store.dispatch(loadCentersForPharmacy({pharmacyId: this.pharmacyId}));
    this.isLoading = true;
    this.centers$ = this.store.pipe(
      select(getPharmacyCenters),
      filter(centers => centers !== null),
      map(centers => {
        this.isLoading = false;
        const centersData = new MatTableDataSource<Center>(centers);
        centersData.paginator = this.paginator;
        centersData.sort = this.sort;
        return centersData;
      })
    );
  }

  editCenter(center: Center) {
    const dialogRef = this.dialog.open(CenterDialogComponent, {
      width: '850px',
      data: {
        center: { ...center },
        times: Date.now()
      }
    });
    dialogRef.afterClosed().subscribe((updatedCenter: Center) => {
      if (updatedCenter) {
        updatedCenter.id = center.id;
        updatedCenter.pharmacyId = center.pharmacyId;
        this.store.dispatch(updateCenter({updatedCenter}));
      }
    });
  }

  createCenter() {
    const dialogRef = this.dialog.open(CenterDialogComponent, {
      width: '500px',
      data: {
        center: {
          city: '',
          county: '',
          email: '',
          phone: '',
          street: '',
        },
        times: Date.now()
      }
    });
    dialogRef.afterClosed().subscribe((newCenter: Center) => {
      if (newCenter) {
        newCenter.pharmacyId = +this.pharmacyId;
        this.store.dispatch(createCenter({newCenter}));
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnDestroy();
    this.subscriptions$ = [];
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}
