import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/api/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';

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
  isLoginFailed: boolean = false;
  isPasswordHidden: boolean = true;
  isLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _storageService: StorageService,
    private _routerService: Router
  ) {}

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
    this.isLoginFailed = false;
    this._storageService.saveUserToStorage(user);
    this._routerService.navigate(['home']);
  }

  private handleError(error: HttpErrorResponse): void {
    this.isLoginFailed = true;

    switch (error.status) {
      case 401: {
        this.errorMessage = 'Špatné jméno nebo heslo!';
        break;
      }
      case 423: {
        this.errorMessage = 'První ověřte svůj email!';
        break;
      }
      default: {
        this.errorMessage = 'Server není dostupný!';
        break;
      }
    }
  }
}
