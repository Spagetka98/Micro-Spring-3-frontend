import { OnInit , Component, Input } from '@angular/core';
import { INews } from 'src/app/models/news.model';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input({ required: true }) news!: INews; 

  public isLoading: boolean = false;
  public username: string = "";
  public role: string = "";

  constructor(
    private _userService: UserService){}
  
    ngOnInit() {
    this.isLoading = true;

    this._userService.getUserDetails(this.news.userId)
    .subscribe({
      next: (data: IUser) => {
        this.username = data.username;
        this.role = data.role;
      },
      error: (err) => this.handleError(err),
    }).add(() => this.isLoading = false); 
  }

  private handleError(err: any): void {
    throw new Error('Method not implemented.');
  }

}
