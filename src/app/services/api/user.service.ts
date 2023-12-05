import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_POST_LOGIN, API_POST_REGISTRATION, API_GET_LOGOUT, API_GET_USER_DETAILS } from './api.path';
import { IUser } from 'src/app/models/user.model';
import { IRegistration } from 'src/app/models/registration.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  public login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(API_POST_LOGIN, { username, password });
  }

  public register(registration: IRegistration): Observable<{}> {
    return this.http.post(API_POST_REGISTRATION, registration);
  }

  public logout(): Observable<{}> {
    return this.http.get(API_GET_LOGOUT);
  }

  public getUserDetails(userId: string): Observable<IUser> {
    let params = new HttpParams();
    params = params.append("id",userId);

    return this.http.get<IUser>(API_GET_USER_DETAILS,{params: params})
  }
}
