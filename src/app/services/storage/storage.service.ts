import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly USER_KEY: string = "USER_DATA";

  constructor() { }

  public cleanStorage(): void {
    window.sessionStorage.clear();
  }

  public saveUserToStorage(user: User): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  
  public getUserFromStorage(): User | null {
    const user = window.sessionStorage.getItem(this.USER_KEY);

    return user ? JSON.parse(user) : null;
  }

  public isUserLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this.USER_KEY);

    return user ? true : false;
  }
}
