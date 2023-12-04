import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { httpInterceptorProviders } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmptyLayoutComponent } from './layouts/empty.layout';
import { NavbarLayoutComponent } from './layouts/navbar.layout';
import { ForgetPassEmailComponent } from './pages/forget-pass-email/forget-pass-email.component';
import { ResetPassComponent } from './pages/reset-pass/reset-pass.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {MatSidenavModule} from '@angular/material/sidenav';
import { NewsComponent } from './pages/news/news.component';
import { NewsWindowComponent } from './pages/news/components/news/news-window.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { CommentsShowComponent } from './pages/news-details/components/comments-show/comments-show.component';
import { CommentComponent } from './pages/news-details/components/comment/comment.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NewsComponent,
    NewsWindowComponent,
    NavbarComponent,
    EmptyLayoutComponent,
    NavbarLayoutComponent,
    ForgetPassEmailComponent,
    ResetPassComponent,
    EmailVerificationComponent,
    PaginationComponent,
    NewsDetailsComponent,
    CommentsShowComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatStepperModule,
    MatSnackBarModule,
    MatIconModule,
    MatSidenavModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
