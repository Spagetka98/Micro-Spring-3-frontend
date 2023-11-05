import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/api/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public itemsShowCount = 0;


  constructor(
    private http: HttpClient,
    private _auth: AuthService,
    private _storage: StorageService){

  }

  ngOnInit(): void {

  }
}
