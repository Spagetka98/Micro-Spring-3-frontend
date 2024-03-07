import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Role } from '../../enums/role.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private storageService: StorageService = inject(StorageService);
  private router: Router = inject(Router);
  
  public isLoading: boolean = false;
  public role: Role = Role.ROLE_USER;
  public Roles = Role;

  ngOnInit(): void {
    this.handleRole();
  }
  
  public logout(): void { 
    this.isLoading = true;
    
    this.userService.logout()
    .subscribe()
    .add(() => this.handleFinish());
  }

  private handleRole(): void {
    const role = this.storageService.getUserRole();

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
