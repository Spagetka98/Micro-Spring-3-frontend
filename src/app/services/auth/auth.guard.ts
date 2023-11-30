import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private _storage: StorageService, private _router: Router) {}

  public canActivate(): boolean {
    if (this._storage.isUserLoggedIn()) return true;
    else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
