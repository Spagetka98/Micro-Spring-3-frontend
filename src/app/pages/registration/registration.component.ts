import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IRegistration } from 'src/app/models/registration.model';
import { AuthService } from 'src/app/services/api/auth.service';
import Validation from './validator/matchpassword.validator';

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

  userDetailsForm = this.formBuilder.group({
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

  accountDetailsForm = this.formBuilder.group({
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
    private formBuilder: FormBuilder,
    private authService: AuthService
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

    this.authService
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

    this.message = "V pořádku! Na Váš email jsme Vám zaslali aktivační email!"
  }

  private displayErrorMessage(error: HttpErrorResponse): void {
    this.isRegistrationFailed = true;
    this.isRegistrationSuccess = false;

    if(error.status == 409 && error.error.message.toLocaleLowerCase().includes("email"))
      this.message = "Tento email je již zabraný!";
    else if(error.status == 409 && error.error.message.toLocaleLowerCase().includes("username"))
      this.message = "Toto přihlašovací jméno je již zabrané!";
    else
      this.message = "Oops! Něco se u nás pokazilo"
  }
  
}
