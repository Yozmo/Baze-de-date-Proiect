import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Supplier} from "../../../../api/models/supplier";
import {select, Store} from "@ngrx/store";
import {getSuppliers, SupplierAppState} from "../../state";
import {MatDialog} from "@angular/material/dialog";
import {loadSuppliersPage} from "../../state/suppliers/supplier.actions";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'suppliers-table',
  templateUrl: './suppliers-table.component.html',
  styleUrls: ['./suppliers-table.component.scss']
})
export class SuppliersTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public suppliers$: Observable<MatTableDataSource<Supplier>>;
  public displayedColumns: string [] = [
    'name',
    'country',
    'city',
    'county',
    'street'
  ];
  public isLoading: boolean = true;

  constructor(
    private store: Store<SupplierAppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.dispatch(loadSuppliersPage({}));
    this.isLoading = true;
    this.suppliers$ = this.store.pipe(
      select(getSuppliers),
      filter(suppliers => suppliers !== null),
      map(suppliers => {
        this.isLoading = false;
        const supplierData = new MatTableDataSource<Supplier>(suppliers);
        supplierData.paginator = this.paginator;
        supplierData.sort = this.sort;
        return supplierData;
      })
    )
  }

}
