import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PASSWORD_REGEX } from 'src/app/services/regex/regex.service';
import Validation from '../registration/validator/matchpassword.validator';
import { PasswordService } from 'src/app/services/api/password.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  resetForm = this._formBuilder.group({
    password: ['', 
      [Validators.required, Validators.min(8), Validators.pattern(PASSWORD_REGEX)]
    ],
    confirmPassword: ['',
      [Validators.required]
    ],
  },{
    validators: [Validation.match('password', 'confirmPassword')]
  });

  message: string | undefined;
  token: string | null | undefined;
  isResetSuccess: boolean = false;
  isResetFailed: boolean = false;
  isPasswordHidden: boolean = true;
  isConfirmPasswordHidden: boolean = true;
  isLoading: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _password: PasswordService,
    private _translate: TranslateService
  ) {}

  get resetFormControl() {
    return this.resetForm.controls;
  }

  ngOnInit(): void {
    this.token = this._activatedRoute.snapshot.paramMap.get("token");
  }

  onSubmit(): void {
    this.resetFormControl.password.markAsTouched();
    this.resetFormControl.confirmPassword.markAsTouched();

    if (this.resetForm.invalid) return;

    this.isLoading = true;

    this._password
      .resetPasswordByToken({passwordToken: this.token!,newPassword: this.resetForm.value.confirmPassword!})
      .subscribe({
        next: () => this.displaySuccessMessage(),
        error: (err) => this.displayErrorMessage(err),
      })
      .add(() => this.isLoading = false);
  }

  private displaySuccessMessage(): void {
    this.isResetFailed = false;
    this.isResetSuccess = true;

    this._translate.get("RESET_PASS.SUCCESS").subscribe(data => this.message = data)
  }

  private displayErrorMessage(error: HttpErrorResponse): void {
    this.isResetFailed = true;
    this.isResetSuccess = false;

    switch (error.status) {
      case 423: {
        this._translate.get("RESET_PASS.FAILED_EXPIRATION").subscribe(data => this.message = data)
        break;
      }
      default: {
        this._translate.get("RESET_PASS.FAILED_SERVER").subscribe(data => this.message = data)
        break;
      }
    }
  }
}
