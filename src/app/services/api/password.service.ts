import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { API_POST_EMAIL_FORGOT, API_POST_EMAIL_TOKEN_RESET } from "./api.path";
import { IResetPassword } from "src/app/models/reset.model";

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private http: HttpClient = inject(HttpClient);

  public sendRefreshEmail(email: string): Observable<{}> {
    return this.http.post(API_POST_EMAIL_FORGOT,{email});
  }

  public resetPasswordByToken(password: IResetPassword): Observable<{}> {
    return this.http.post(API_POST_EMAIL_TOKEN_RESET,password);
  }
}
