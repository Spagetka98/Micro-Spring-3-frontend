import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/api/auth.service';
import { LoadingService } from 'src/app/services/helpers/loading.service';
import Validation from 'src/app/services/validator/matchpassword.validator';

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
    private authService: AuthService,
    public loadingService: LoadingService) {}
  
  get userDetailsFormControl() {
    return this.userDetailsForm.controls;
  }

  get accountDetailsFormControl() {
    return this.accountDetailsForm.controls;
  }

  onSubmit(): void{
    if(this.userDetailsForm.invalid || this.accountDetailsForm.invalid) return;

    this.loadingService.setLoading(true);

    this.authService
      .register(
        this.accountDetailsForm.value.username!,
        this.userDetailsForm.value.firstName!,
        this.userDetailsForm.value.lastName!,
        this.userDetailsForm.value.email!,
        this.accountDetailsForm.value.password!)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => { 
         console.log(err);
        },
      })
      .add(() => this.loadingService.setLoading(false));
  }
  
}
