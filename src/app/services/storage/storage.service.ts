import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';
import { Role } from 'src/app/enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly USER_KEY: string = "USER_DATA";

  public cleanStorage(): void {
    window.sessionStorage.clear();
  }

  public saveUserToStorage(user: IUser): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  
  public getUserFromStorage(): IUser | null {
    const user = window.sessionStorage.getItem(this.USER_KEY);

    return user ? JSON.parse(user) : null;
  }

  public getUserRole(): Role | null {
    const user = this.getUserFromStorage();

    return user ? user.role : null;
  }

  public isUserLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this.USER_KEY);

    return user ? true : false;
  }
}
