import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoading: boolean = false;

  constructor(
    private _auth: AuthService,
    private _storage: StorageService,
    private _router: Router){}
  
  logout(): void {
    
    this.isLoading = true;
    
    this._auth.logout()
    .subscribe()
    .add(() => this.handleFinish());
  }

  private handleFinish(): void{
    this.isLoading = false

    this._storage.cleanStorage()
    this._router.navigate(['login']);
  }
}
