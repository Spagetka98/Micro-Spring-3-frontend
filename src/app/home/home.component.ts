import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient){

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
