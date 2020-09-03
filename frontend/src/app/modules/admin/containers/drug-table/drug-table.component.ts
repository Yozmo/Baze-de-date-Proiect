import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable, Subscription} from "rxjs";
import {AdminAppState, getDrugs} from "../../state";
import {select, Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Drug} from "../../../../api/models/drug";
import {createDrug, loadDrugPage, updateDrug} from "../../state/drug/drug.actions";
import {filter, map} from "rxjs/operators";
import {DrugDialogComponent} from "../drug-dialog/drug-dialog.component";

@Component({
  selector: 'drug-table',
  templateUrl: './drug-table.component.html',
  styleUrls: ['./drug-table.component.scss']
})
export class DrugTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public drugs$: Observable<MatTableDataSource<Drug>>;
  public selectionForDelete = new Set<string>();
  public displayedColumns: string[] = [
    'name',
    'quantity',
    'strength',
    'price',
    'description'
  ];
  public isLoading: boolean = true;

  constructor(
    private ref: ChangeDetectorRef,
    private store: Store<AdminAppState>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.dispatch(loadDrugPage({}));
    this.isLoading = true;
    this.drugs$ = this.store.pipe(
      select(getDrugs),
      filter(drugs => drugs !== null),
      map(drugs => {
        this.isLoading = false;
        const drugData = new MatTableDataSource<Drug>(drugs);
        drugData.paginator = this.paginator;
        drugData.sort = this.sort;
        return drugData;
      })
    );
  }

  editDrug(drug: Drug) {
    const dialogRef = this.dialog.open(DrugDialogComponent, {
      width: '500px',
      data: {
        drug: { ...drug },
        times: Date.now()
      }
    });
    dialogRef.afterClosed().subscribe((updatedDrug: Drug) => {
      if (updatedDrug) {
        updatedDrug.id = drug.id;
        this.store.dispatch(updateDrug({ updatedDrug }));
      }
    });
  }

  createDrug() {
    const dialogRef = this.dialog.open(DrugDialogComponent, {
      width: '500px',
      data: {
        drug: {
          name: '',
          quantity: '',
          strength: '',
          price: '',
          description: '',
        },
        times: Date.now()
      }
    });
    dialogRef.afterClosed().subscribe((newDrug: Drug) => {
      if (newDrug) {
        this.store.dispatch(createDrug({ newDrug }));
      }
    });
  }

}
