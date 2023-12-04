import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Role } from '../../enums/role.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent {
  public isLoading: boolean = false;
  public role: Role = Role.ROLE_USER;
  public Roles = Role;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router) {
      this.handleRole();
    }
  
  public logout(): void { 
    this.isLoading = true;
    
    this.userService.logout()
    .subscribe()
    .add(() => this.handleFinish());
  }

  private handleRole(): void {
    let role = this.storageService.getUserRole();

    if(role) 
      this.role = role;
    else 
      this.handleFinish();
  }

  private handleFinish(): void {
    this.isLoading = false

    this.storageService.cleanStorage()
    this.router.navigate(['login']);
  }
}
