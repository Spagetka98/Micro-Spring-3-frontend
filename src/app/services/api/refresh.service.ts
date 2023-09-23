import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RefreshJWTApi } from './api.path';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  constructor(private _http: HttpClient) {}

  public refreshJWT(): Observable<{}> {
    return this._http.get(RefreshJWTApi);
  }
}
