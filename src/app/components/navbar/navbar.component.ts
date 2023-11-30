import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Role } from '../enums/role.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isLoading: boolean = false;
  public role: Role = Role.ROLE_USER;
  public Roles = Role;

  constructor(
    private _userService: UserService,
    private _storage: StorageService,
    private _router: Router) {
      this.handleRole();
    }
  
  public logout(): void { 
    this.isLoading = true;
    
    this._userService.logout()
    .subscribe()
    .add(() => this.handleFinish());
  }

  private handleRole(): void {
    let role = this._storage.getUserRole();

    if(role) 
      this.role = role;
    else 
      this.handleFinish();
  }

  private handleFinish(): void {
    this.isLoading = false

    this._storage.cleanStorage()
    this._router.navigate(['login']);
  }
}
