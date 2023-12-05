import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_GET_REFRESH_JWT } from './api.path';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  private http: HttpClient = inject(HttpClient);

  public refreshJWT(): Observable<{}> {
    return this.http.get(API_GET_REFRESH_JWT);
  }
}
