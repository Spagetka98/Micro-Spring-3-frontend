import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { EmptyLayoutComponent } from './layouts/empty.layout';
import { NavbarLayoutComponent } from './layouts/navbar.layout';
import { ForgetPassEmailComponent } from './pages/forget-pass-email/forget-pass-email.component';
import { ResetPassComponent } from './pages/reset-pass/reset-pass.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { AuthGuard } from './services/auth/auth.guard';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarLayoutComponent,
    canActivate: mapToCanActivate([AuthGuard]),
    children: [
      {
        path: 'news',
        children: [
          {
            path: '',
            component: NewsComponent
          },
          {
            path: 'details/:id',
            component: NewsDetailsComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },   
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'email-verification/:token',
        component: EmailVerificationComponent
      },
      {
        path: 'password',
        children: [
          {
            path: 'forgot',
            component: ForgetPassEmailComponent
          },
          {
            path: 'reset/:token',
            component: ResetPassComponent
          },
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
