import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginApi, RegisterApi, LogoutApi } from './api.path';
import { IUser } from 'src/app/models/user.model';
import { IRegistration } from 'src/app/models/registration.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(LoginApi, { username, password });
  }

  public register(registration: IRegistration): Observable<{}> {
    return this.http.post(RegisterApi, registration);
  }

  public logout(): Observable<{}> {
    return this.http.get(LogoutApi);
  }
}
