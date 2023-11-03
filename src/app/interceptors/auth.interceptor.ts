import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHeaders,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import { RefreshService } from '../services/api/refresh.service';
import { Router } from '@angular/router';
import { API_POST_LOGIN } from '../services/api/api.path';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;

  constructor(
    private _storage: StorageService,
    private _refresh: RefreshService,
    private _router: Router
  ) {}

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && req.url !== API_POST_LOGIN) return this.handleExpiration(req, next);
        else return throwError(() => error);
      })
    );
  }

  handleExpiration(request: HttpRequest<any>, next: HttpHandler) {
    if (this.isRefreshing) return next.handle(request);
    if (!this._storage.isUserLoggedIn()) return throwError(() => 'User is not logged in!');

    this.isRefreshing = true;

    return this._refresh.refreshJWT().pipe(
      switchMap(() => {
        this.isRefreshing = false;
          
        return next.handle(request);
      }),
      catchError((error) => {
        this.isRefreshing = false;

        this._router.navigateByUrl('/login', { state: {loginExpiration: true} });

        this._storage.cleanStorage();

        return throwError(() => error);
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
