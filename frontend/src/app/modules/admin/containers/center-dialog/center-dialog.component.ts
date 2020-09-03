import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Stock} from "../../../../api/models/stock";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StockService} from "../../services/stock.service";
import {Center} from "../../../../api/models/center";
import {FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {map} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-center-dialog',
  templateUrl: './center-dialog.component.html',
  styleUrls: ['./center-dialog.component.scss']
})
export class CenterDialogComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public title: string;
  public stocks$: Observable<MatTableDataSource<Stock>>;
  public centerForm: FormGroup;


  public displayedColumns: string[] = [
    'nameOfStock',
    'totalQuantity'
  ];

  constructor(
    public dialogRef: MatDialogRef<CenterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public stockService: StockService
  ) {
    this.stocks$ = this.stockService.getStockForCenter(data.center.id).pipe(
      map(stocks => {
        const stocksData = new MatTableDataSource<Stock>(stocks);
        stocksData.paginator = this.paginator;
        stocksData.sort = this.sort;
        return stocksData;
      })
    );
    this.title = data.center.id ? 'Editati informatiile din centru' : 'Creati un nou centru';
  }

  ngOnInit() {
    const center: Center = this.data.center;
    this.centerForm = new FormGroup({
      city: new FormControl(center.city),
      county: new FormControl(center.county),
      email: new FormControl(center.email),
      phone: new FormControl(center.phone),
      street: new FormControl(center.street),
      postalCode: new FormControl(center.postalCode),
    })
  }

  onClick(formValue?: Center): void {
    if (formValue) {
      this.dialogRef.close(formValue);
    } else {
      this.dialogRef.close();
    }
  }
}
