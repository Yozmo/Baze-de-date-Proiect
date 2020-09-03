import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountService} from "../../services/account.service";
import {AlertService} from "../../../../core/services/alert.service";
import {Account} from "../../../../api/models/account";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Component({
  selector: 'account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss']
})
export class AccountDialogComponent implements OnInit, OnDestroy {

  public accountForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    private accountService: AccountService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.accountForm = new FormGroup({
      name: new FormControl(this.data.account.name, [Validators.required]),
      email: new FormControl({ value: this.data.account.email, disabled: this.data.editMode }, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')], this.forbiddenEmail.bind(this)),
      roles: new FormGroup({
        admin: new FormControl(this.data.account.roles.includes('admin')),
        customer: new FormControl(this.data.account.roles.includes('customer'))
      }),
      country: new FormControl(this.data.account.country),
      county: new FormControl(this.data.account.county),
      password: new FormControl(this.data.account.password),

    });
  }

  onClick(formValue?: Account): void {
    if (formValue) {
      const accountForm = JSON.parse(JSON.stringify(this.accountForm.getRawValue()));
      accountForm.roles = this.mapObjectToArray(accountForm, 'roles');
      this.dialogRef.close(accountForm);
    } else {
      this.dialogRef.close();
    }
  }

  private mapObjectToArray(accountForm: Account, arrayName: string): Array<string> {
    const data = [];
    Object.keys(accountForm[arrayName]).forEach((key, index) => {
      if (accountForm[arrayName][key]) {
        data.push(key);
      }
    });
    return data;
  }

  forbiddenEmail(control: AbstractControl): Observable<any> {
    return this.accountService.isEmailUnique(control.value).pipe(
      map((unique: boolean) => {
        if (unique) {
          return null;
        } else {
          this.alertService.error('Email existent!');
          return { forbiddenEmail: true };
        }
      }),
      catchError(val => {
        return of(val);
      })
    );
  }

  ngOnDestroy(): void {
  }

}
