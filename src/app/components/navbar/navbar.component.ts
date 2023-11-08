import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoading: boolean = false;

  constructor(
    private _userService: UserService,
    private _storage: StorageService,
    private _router: Router){}
  
  logout(): void {
    
    this.isLoading = true;
    
    this._userService.logout()
    .subscribe()
    .add(() => this.handleFinish());
  }

  private handleFinish(): void{
    this.isLoading = false

    this._storage.cleanStorage()
    this._router.navigate(['login']);
  }
}
