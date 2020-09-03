import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pharmacy} from "../../../../api/models/pharmacy";
import {SupplierService} from "../../../supplier/services/supplier.service";
import {Supplier} from "../../../../api/models/supplier";

@Component({
  selector: 'app-pharmacy-dialog',
  templateUrl: './pharmacy-dialog.component.html',
  styleUrls: ['./pharmacy-dialog.component.scss']
})
export class PharmacyDialogComponent implements OnInit {

  public pharmacyForm: FormGroup;
  public title: string = 'Creeaza o farmacie';
  public supplierList: Array<Supplier> = [];
  public pharmacyTypes = ['COMMUNITY', 'NATURIST'];

  constructor(
    public dialogRef: MatDialogRef<PharmacyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private supplierService: SupplierService
  ) { }

  ngOnInit() {
    this.pharmacyForm = new FormGroup({
      name: new FormControl(this.data.pharmacy.name),
      pharmacyType: new FormControl(this.data.pharmacy.pharmacyType),
      supplierIds: new FormControl([])
    })

    this.supplierService.getAllSuppliers().subscribe(suppliers => {
      this.supplierList = suppliers;
    });
  }

  onClick(formValue?: Pharmacy): void {
    if (formValue) {
      this.dialogRef.close(formValue);
    } else {
      this.dialogRef.close();
    }
  }

  displayFormatterType(type) {
    return type === 'COMMUNITY' ? 'De stat' : 'Naturista'
  }

  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id === object2.id;
  }

}
