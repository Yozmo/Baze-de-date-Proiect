import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Credentials, User } from '../../models';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.forgotPasswordForm.disable();
      this.loginForm.disable();
    } else {
      this.forgotPasswordForm.enable();
      this.loginForm.enable();
    }
  }

  @Input() user: User;

  @Input() errorMessage: any;

  @Output() submitted = new EventEmitter<Credentials>();

  @Output() resetPasswordOutput = new EventEmitter<string>();

  public showResetPassword: boolean;
  private subscriptions$: Array<Subscription> = [];

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false)
  });

  forgotPasswordForm: FormGroup = new FormGroup({
    email: this.fb.control('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    if (this.user) {
      this.loginForm.patchValue({
        username: this.user.name,
        password: this.user.password
      });
    }
  }

  submit() {
    if (this.loginForm.valid) {
      this.submitted.emit(this.loginForm.value);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
