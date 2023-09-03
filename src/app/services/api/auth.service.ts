import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthApiPath,UserApiPath} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    let loginUrl: string = AuthApiPath.Login;

    return this.http.post(loginUrl,{username,password});
  }

  public register(username: string, firstName:string, lastName:string, email: string, password: string): Observable<any> {
    let registerUrl: string = AuthApiPath.Register;

    return this.http.post(registerUrl,{username,firstName,lastName,email,password},);
  }

  public logout(): Observable<any> {
    let logoutUrl: string = UserApiPath.Logout;

    return this.http.get(logoutUrl)
  }
}
