import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_POST_LOGIN, API_POST_REGISTRATION, API_GET_LOGOUT } from './api.path';
import { IUser } from 'src/app/models/user.model';
import { IRegistration } from 'src/app/models/registration.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  public login(username: string, password: string): Observable<IUser> {
    return this._http.post<IUser>(API_POST_LOGIN, { username, password });
  }

  public register(registration: IRegistration): Observable<{}> {
    return this._http.post(API_POST_REGISTRATION, registration);
  }

  public logout(): Observable<{}> {
    return this._http.get(API_GET_LOGOUT);
  }
}
