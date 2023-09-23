import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { EmptyLayoutComponent } from './layouts/empty.layout';
import { NavbarLayoutComponent } from './layouts/navbar.layout';
import { AuthGuard } from './services/auth/authguard.service';

const routes: Routes = [
  {
    path: '',
    component: NavbarLayoutComponent,
    canActivate: mapToCanActivate([AuthGuard]),
    children: [
      {
        path: 'home',
        component: HomeComponent
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
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
