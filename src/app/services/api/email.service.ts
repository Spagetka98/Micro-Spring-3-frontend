import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { API_GET_EMAIL_CONFIRMATION } from "./api.path";

@Injectable({
    providedIn: 'root',
  })
  export class EmailService {
    constructor(private _http: HttpClient) {}

    public emailConfirmation(token: string): Observable<{}> {
        let params = new HttpParams();
        params = params.append("token",token);
        
        return this._http.get(API_GET_EMAIL_CONFIRMATION,{params: params});
    }

  }

  