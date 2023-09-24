import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PasswordService } from 'src/app/services/api/password.service';
import { EMAIL_REGEX } from 'src/app/services/regex/regex.service';

@Component({
  selector: 'app-forget-pass-email',
  templateUrl: './forget-pass-email.component.html',
  styleUrls: ['./forget-pass-email.component.css']
})
export class ForgetPassEmailComponent {
  forgetForm = this._formBuilder.group({
    email: ['',
      [Validators.required, Validators.pattern(EMAIL_REGEX)]
    ],
  });

  message: string | undefined;
  isLoading: boolean = false;
  isResetFailed: boolean = false;
  isResetSuccess: boolean = false;

  get forgetFormControl(){
    return this.forgetForm.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _password: PasswordService,
    private _translate: TranslateService
  ) {}

  public onSubmit(): void {
    this.forgetFormControl.email.markAsTouched();

    if (this.forgetForm.invalid) return;

    this.isLoading = true;

    this._password
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

    this._translate.get("FORGET_PASS.SUCCESS").subscribe(data => this.message = data)
  }

  private displayErrorMessage(): void {
    this.isResetFailed = true;
    this.isResetSuccess = false;

    this._translate.get("FORGET_PASS.FAILED").subscribe(data => this.message = data)
  }
}
