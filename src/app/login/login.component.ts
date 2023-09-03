import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/api/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../services/helpers/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string = 'errorMessage';
  isSubmitted: boolean = false;
  isLoginFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private routerService: Router,
    public loadingService: LoadingService
  ) {}

  get loginFormControl() {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    if (!this.loginForm.value.username || !this.loginForm.value.password)
      return;

    this.loadingService.setLoading(true);

    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (data) => {
          this.isLoginFailed = false;
          this.storageService.saveUserToStorage(data);

          this.routerService.navigate(['home']);
        },
        error: (err) => {
          this.isLoginFailed = true;

          this.displayErrorMessage(err);
        },
      })
      .add(() => this.loadingService.setLoading(false));
  }

  private displayErrorMessage(error: HttpErrorResponse): void {
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
