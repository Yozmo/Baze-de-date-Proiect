import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'edit-user-profile-dialog',
  templateUrl: './edit-user-profile-dialog.component.html',
  styleUrls: ['./edit-user-profile-dialog.component.scss']
})
export class EditUserProfileDialogComponent implements OnInit {

  public accountForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.accountForm = new FormGroup({
      email: new FormControl(this.data.email),
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name, [Validators.required]),
      password: new FormControl(this.data.password),
      profilePicture: new FormControl(this.data.profilePicture),
      country: new FormControl(this.data.country),
      county: new FormControl(this.data.county),
      roles: new FormControl(this.data.roles),
    });
  }

  onClick(formValue?: Account): void {
    if (formValue) {
      const accountForm = JSON.parse(JSON.stringify(this.accountForm.getRawValue()));
      this.dialogRef.close(accountForm);
    } else {
      this.dialogRef.close();
    }
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.accountForm.get('profilePicture').setValue(reader.result);
  }

}
