import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: boolean = false;
  
  constructor() { }

  public getLoading() : boolean{
    return this.loading;
  }

  public setLoading(loading: boolean): void {
    this.loading = loading;
  }
}
