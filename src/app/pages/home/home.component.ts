import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/api/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventSub?: Subscription;

  constructor(
    private http: HttpClient,
    private _auth: AuthService,
    private _storage: StorageService){

  }

  ngOnInit(): void {

    fetch("/api/test/endpoint")
      .then(data => console.log(data));

      this.http.get("/api/test/endpoint", { headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      })
  }
}
