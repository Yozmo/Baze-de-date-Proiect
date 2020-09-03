import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DrugService} from "../../services/drug.service";
import {Drug} from "../../../../api/models/drug";

@Component({
  selector: 'app-drug-dialog',
  templateUrl: './drug-dialog.component.html',
  styleUrls: ['./drug-dialog.component.scss']
})
export class DrugDialogComponent implements OnInit {

  public title: string;
  public drugForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DrugDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public drugService: DrugService
  ) {
    this.title = data.drug.id ? 'Editati medicamentul' : 'Creati un medicament';
  }

  ngOnInit() {
    const drug: Drug = this.data.drug;
    this.drugForm = new FormGroup({
      name: new FormControl(drug.name),
      quantity: new FormControl(drug.quantity),
      strength: new FormControl(drug.strength),
      price: new FormControl(drug.price),
      description: new FormControl(drug.description),
    });
  }

  onClick(formValue?: Drug): void {
    if (formValue) {
      this.dialogRef.close(formValue);
    } else {
      this.dialogRef.close();
    }
  }

}
