import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_POST_EMAIL_FORGOT, API_POST_EMAIL_TOKEN_RESET } from "./api.path";
import { IResetPassword } from "src/app/models/reset.model";

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private _http: HttpClient) {}

  public sendRefreshEmail(email: string): Observable<{}> {
    return this._http.post(API_POST_EMAIL_FORGOT,{email});
  }

  public resetPasswordByToken(password: IResetPassword): Observable<{}> {
    return this._http.post(API_POST_EMAIL_TOKEN_RESET,password);
  }
}
