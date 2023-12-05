import { Injectable, inject } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthGuard {
  private storageService: StorageService = inject(StorageService);
  private router: Router = inject(Router);

  public canActivate(): boolean {
    if (this.storageService.isUserLoggedIn()) return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
