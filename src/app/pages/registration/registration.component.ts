import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IRegistration } from 'src/app/models/registration.model';
import { AuthService } from 'src/app/services/api/auth.service';
import Validation from './validator/matchpassword.validator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  private NAME_REGEX: string = "^[A-ža-ž]+$";
  private EMAIL_REGEX: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$';
  private USERNAME_REGEX: string = '^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9])+[a-zA-Z0-9]$';
  private PASSWORD_REGEX: string = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=\\S+$).+$';
  
  message: string | undefined;
  isPasswordHidden: boolean = true;
  isConfirmPasswordHidden: boolean = true;
  isRegistrationFailed: boolean = false;
  isRegistrationSuccess: boolean = false;
  isLoading: boolean = false;

  userDetailsForm = this._formBuilder.group({
    firstName: ['', 
      [Validators.required, Validators.min(2), Validators.pattern(this.NAME_REGEX)]
    ],
    lastName: ['',
      [Validators.required, Validators.min(2), Validators.pattern(this.NAME_REGEX)]
    ],
    email: ['',
      [Validators.required, Validators.pattern(this.EMAIL_REGEX)]
    ],
  });

  accountDetailsForm = this._formBuilder.group({
    username: ['',
      [Validators.required, Validators.min(3), Validators.max(30), Validators.pattern(this.USERNAME_REGEX)]
    ],
    password: ['', 
      [Validators.required, Validators.min(8), Validators.pattern(this.PASSWORD_REGEX)]
    ],
    confirmPassword: ['',
      [Validators.required]
    ],
  },{
    validators: [Validation.match('password', 'confirmPassword')]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _translate: TranslateService
  ) {}
  
  get userDetailsFormControl() {
    return this.userDetailsForm.controls;
  }

  get accountDetailsFormControl() {
    return this.accountDetailsForm.controls;
  }

  onSubmit(): void{
    if(this.userDetailsForm.invalid || this.accountDetailsForm.invalid) return;

    this.isLoading = true;
    this.message = undefined;

    const registrationRequest: IRegistration = {
      username: this.accountDetailsForm.value.username,
      firstName: this.userDetailsForm.value.firstName,
      lastName: this.userDetailsForm.value.lastName,
      email: this.userDetailsForm.value.email,
      password: this.accountDetailsForm.value.password
    };

    this._authService
      .register(registrationRequest)
      .subscribe({
        next: () => this.displaySuccessMessage(),
        error: (err: HttpErrorResponse) => this.displayErrorMessage(err),
      })
      .add(() => this.isLoading = false);
  }

  private displaySuccessMessage(): void {
    this.isRegistrationFailed = false;
    this.isRegistrationSuccess = true;

    this._translate.get("REGISTRATION.SUCCESS").subscribe(data => this.message = data)
  }

  private displayErrorMessage(error: HttpErrorResponse): void {
    this.isRegistrationFailed = true;
    this.isRegistrationSuccess = false;

    if(error.status == 409 && error.error.message.toLocaleLowerCase().includes("email"))
      this._translate.get("REGISTRATION.EMAIL_TAKEN").subscribe(data => this.message = data)
    else if(error.status == 409 && error.error.message.toLocaleLowerCase().includes("username"))
      this._translate.get("REGISTRATION.NAME_TAKEN").subscribe(data => this.message = data)
    else
      this._translate.get("REGISTRATION.SERVER_ERROR").subscribe(data => this.message = data)
  }
  
}
