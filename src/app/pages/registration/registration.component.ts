import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRegistration } from 'src/app/models/registration.model';
import { UserService } from 'src/app/services/api/user.service';
import Validation from './validator/matchpassword.validator';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from 'src/app/services/regex/regex.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [ 
    CommonModule, MatIconModule, MatFormFieldModule, MatStepperModule,
    TranslateModule, ReactiveFormsModule, MatInputModule, RouterLink
  ]
})
export class RegistrationComponent {  
  public message?: string;
  public isPasswordHidden: boolean = true;
  public isConfirmPasswordHidden: boolean = true;
  public isRegistrationFailed: boolean = false;
  public isRegistrationSuccess: boolean = false;
  public isLoading: boolean = false;

  public userDetailsForm = this.formBuilder.group({
    firstName: ['', 
      [Validators.required, Validators.min(2), Validators.pattern(NAME_REGEX)]
    ],
    lastName: ['',
      [Validators.required, Validators.min(2), Validators.pattern(NAME_REGEX)]
    ],
    email: ['',
      [Validators.required, Validators.pattern(EMAIL_REGEX)]
    ],
  });

  public accountDetailsForm = this.formBuilder.group({
    username: ['',
      [Validators.required, Validators.min(3), Validators.max(30), Validators.pattern(USERNAME_REGEX)]
    ],
    password: ['', 
      [Validators.required, Validators.min(8), Validators.pattern(PASSWORD_REGEX)]
    ],
    confirmPassword: ['',
      [Validators.required]
    ],
  },{
    validators: [Validation.match('password', 'confirmPassword')]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private translateService: TranslateService
  ) {}

  onSubmit(): void {
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

    this.userService
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

    this.translateService.get("REGISTRATION.SUCCESS").subscribe(data => this.message = data)
  }

  private displayErrorMessage(error: HttpErrorResponse): void {
    this.isRegistrationFailed = true;
    this.isRegistrationSuccess = false;

    if(error.status == 409 && error.error.message.toLocaleLowerCase().includes("email"))
      this.translateService.get("REGISTRATION.EMAIL_TAKEN").subscribe(data => this.message = data)
    else if(error.status == 409 && error.error.message.toLocaleLowerCase().includes("username"))
      this.translateService.get("REGISTRATION.NAME_TAKEN").subscribe(data => this.message = data)
    else
      this.translateService.get("REGISTRATION.SERVER_ERROR").subscribe(data => this.message = data)
  }
  
}
