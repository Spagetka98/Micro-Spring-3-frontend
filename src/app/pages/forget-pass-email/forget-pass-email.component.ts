import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PasswordService } from 'src/app/services/api/password.service';
import { EMAIL_REGEX } from 'src/app/services/regex/regex.service';

@Component({
  selector: 'app-forget-pass-email',
  templateUrl: './forget-pass-email.component.html',
  styleUrls: ['./forget-pass-email.component.css'],
  standalone: true,
  imports: [
    CommonModule, TranslateModule, ReactiveFormsModule, 
    MatFormFieldModule, MatInputModule, RouterLink
  ]
})
export class ForgetPassEmailComponent {
  public forgetForm = this.formBuilder.group({
    email: ['',
      [Validators.required, Validators.pattern(EMAIL_REGEX)]
    ],
  });
  public message?: string;
  public isLoading: boolean = false;
  public isResetFailed: boolean = false;
  public isResetSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private translateService: TranslateService
  ) {}

  public onSubmit(): void {
    this.forgetForm.controls.email.markAsTouched();

    if (this.forgetForm.invalid) return;

    this.isLoading = true;

    this.passwordService
      .sendRefreshEmail(this.forgetForm.value.email!)
      .subscribe({
        next: () => this.displaySuccessMessage(),
        error: () => this.displayErrorMessage(),
      })
      .add(() => this.isLoading = false);
  }

  private displaySuccessMessage(): void {
    this.isResetFailed = false;
    this.isResetSuccess = true;

    this.translateService.get("FORGET_PASS.SUCCESS").subscribe(data => this.message = data)
  }

  private displayErrorMessage(): void {
    this.isResetFailed = true;
    this.isResetSuccess = false;

    this.translateService.get("FORGET_PASS.FAILED").subscribe(data => this.message = data)
  }
}
