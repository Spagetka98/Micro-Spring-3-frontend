import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/api/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatFormFieldModule, RouterLink,
    TranslateModule, ReactiveFormsModule, MatInputModule
  ],
})
export class LoginComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private storageService: StorageService = inject(StorageService);
  private routerService: Router = inject(Router);
  private translateService: TranslateService = inject(TranslateService);

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  public message?: string;
  public isErrorReceived: boolean = false;
  public isPasswordHidden: boolean = true;
  public isLoading: boolean = false;

  ngOnInit(): void {
    if(history.state?.loginExpiration){
      this.translateService.get("LOGIN.ERRORS.EXPIRATION").subscribe(data => this.message = data)
      this.isErrorReceived = true;
    }  
  }

  public onSubmit(): void {
    this.loginForm.controls.username.markAsTouched();
    this.loginForm.controls.password.markAsTouched();

    if (this.loginForm.invalid) return;

    this.isLoading = true;
 
    this.userService
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe({
        next: (data: IUser) => this.handleSuccess(data),
        error: (err: HttpErrorResponse) => this.handleError(err),
      })
      .add(() => this.isLoading = false);
  }

  private handleSuccess(user: IUser): void{
    this.isErrorReceived = false;

    this.storageService.saveUserToStorage(user);
    this.routerService.navigate(['news']);
  }

  private handleError(error: HttpErrorResponse): void {
    this.isErrorReceived = true;
    
    switch (error.status) {
      case 401: {
        this.translateService.get("LOGIN.ERRORS.WRONG_CREDENTIALS").subscribe(data => this.message = data)
        break;
      }
      case 423: {
        this.translateService.get("LOGIN.ERRORS.UNVERIFIED_EMAIL").subscribe(data => this.message = data)
        break;
      }
      default: {
        this.translateService.get("LOGIN.ERRORS.SERVER_ERROR").subscribe(data => this.message = data)
        break;
      }
    }
  }
}
