import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PASSWORD_REGEX } from 'src/app/services/regex/regex.service';
import Validation from '../registration/validator/matchpassword.validator';
import { PasswordService } from 'src/app/services/api/password.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css'],
  standalone: true,
  imports: [
    CommonModule, TranslateModule, ReactiveFormsModule, 
    MatFormFieldModule, MatInputModule, MatIconModule
  ]
})
export class ResetPassComponent implements OnInit {
  public resetForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.min(8), Validators.pattern(PASSWORD_REGEX)]],
    confirmPassword: ['', [Validators.required]],
  },{
    validators: [Validation.match('password', 'confirmPassword')]
  });

  public message?: string;
  public isResetSuccess: boolean = false;
  public isResetFailed: boolean = false;
  public isPasswordHidden: boolean = true;
  public isConfirmPasswordHidden: boolean = true;
  public isLoading: boolean = false;

  private token?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.paramMap.get("token");

    if(token) 
      this.token = token;
    else {
      this.isResetFailed = true;
      this.translateService.get("RESET_PASS.FAILED_SERVER").subscribe(data => this.message = data)
    }
  }

  onSubmit(): void {
    this.resetForm.controls.password.markAsTouched();
    this.resetForm.controls.confirmPassword.markAsTouched();

    if (this.resetForm.invalid) return;

    this.isLoading = true;

    this.passwordService
      .resetPasswordByToken({passwordToken: this.token! ,newPassword: this.resetForm.value.confirmPassword!})
      .subscribe({
        next: () => this.displaySuccessMessage(),
        error: (err) => this.displayErrorMessage(err),
      })
      .add(() => this.isLoading = false);
  }

  private displaySuccessMessage(): void {
    this.isResetFailed = false;
    this.isResetSuccess = true;

    this.translateService.get("RESET_PASS.SUCCESS").subscribe(data => this.message = data)
  }

  private displayErrorMessage(error: HttpErrorResponse): void {
    this.isResetFailed = true;
    this.isResetSuccess = false;

    switch (error.status) {
      case 423: {
        this.translateService.get("RESET_PASS.FAILED_EXPIRATION").subscribe(data => this.message = data)
        break;
      }
      default: {
        this.translateService.get("RESET_PASS.FAILED_SERVER").subscribe(data => this.message = data)
        break;
      }
    }
  }
}
