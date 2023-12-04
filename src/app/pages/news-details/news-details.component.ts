import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INews } from 'src/app/models/news.model';
import { IUser } from 'src/app/models/user.model';
import { API_GET_NEWS_IMG } from 'src/app/services/api/api.path';
import { NewsService } from 'src/app/services/api/news.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  public isLoading: boolean = false;
  public news?: INews;
  public author?: IUser;
  public IMG_PATH: string = API_GET_NEWS_IMG

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _newsService: NewsService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    const id: string | null = this._activatedRoute.snapshot.paramMap.get("id");
    if(id) this.loadNewsDetails(id);
  }

  public displayErrorMessage(): void {
    throw new Error('Method not implemented.');
  }

  private loadNewsDetails(id: string): void {
    this.isLoading = true;

    this._newsService.getNewsById(Number(id))
    .subscribe({
      next: (data) => {
        this.news = data
        this.loadAuthorDetails(this.news.userId)
      },
      error: () => this.displayErrorMessage(),
    })
    .add(() => this.isLoading = false);
  }

  private loadAuthorDetails(userId: string): void {
    this.isLoading = true;

    this._userService.getUserDetails(userId)
    .subscribe({
      next: (data: IUser) => {
        this.author = data;
      },
      error: () => this.displayErrorMessage(),
    }).add(() => this.isLoading = false); 
  }
}
