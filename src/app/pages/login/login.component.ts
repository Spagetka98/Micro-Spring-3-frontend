import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/api/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | undefined;
  isErrorReceived: boolean = false;
  isPasswordHidden: boolean = true;
  isLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _storageService: StorageService,
    private _routerService: Router,
    private _translate: TranslateService,
  ) {
    if(history.state?.loginExpiration){
      this._translate.get("LOGIN.ERRORS.EXPIRATION").subscribe(data => this.errorMessage = data)
      this.isErrorReceived = true;
    }  
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.loginFormControl.username.markAsTouched();
    this.loginFormControl.password.markAsTouched();

    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = undefined;
    
    this._authService
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe({
        next: (data: IUser) => this.handleSuccess(data),
        error: (err: HttpErrorResponse) => this.handleError(err),
      })
      .add(() => this.isLoading = false);
  }

  private handleSuccess(user: IUser): void{
    this.isErrorReceived = false;

    this._storageService.saveUserToStorage(user);
    this._routerService.navigate(['home']);
  }

  private handleError(error: HttpErrorResponse): void {
    this.isErrorReceived = true;
    
    switch (error.status) {
      case 401: {
        this._translate.get("LOGIN.ERRORS.WRONG_CREDENTIALS").subscribe(data => this.errorMessage = data)
        break;
      }
      case 423: {
        this._translate.get("LOGIN.ERRORS.UNVERIFIED_EMAIL").subscribe(data => this.errorMessage = data)
        break;
      }
      default: {
        this._translate.get("LOGIN.ERRORS.SERVER_ERROR").subscribe(data => this.errorMessage = data)
        break;
      }
    }
  }
}
