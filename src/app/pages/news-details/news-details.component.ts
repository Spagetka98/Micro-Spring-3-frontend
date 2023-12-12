import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { INews } from 'src/app/models/news.model';
import { IUser } from 'src/app/models/user.model';
import { API_GET_NEWS_IMG } from 'src/app/services/api/api.path';
import { NewsService } from 'src/app/services/api/news.service';
import { UserService } from 'src/app/services/api/user.service';
import { CommentsShowComponent } from "./components/comments-show/comments-show.component";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-news-details',
    templateUrl: './news-details.component.html',
    styleUrls: ['./news-details.component.css'],
    standalone: true,
    imports: [CommonModule, TranslateModule, CommentsShowComponent, MatSnackBarModule]
})
export class NewsDetailsComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private newsService: NewsService = inject(NewsService);
  private userService: UserService = inject(UserService);
  private translateService: TranslateService = inject(TranslateService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  
  public isLoading: boolean = false;
  public news?: INews;
  public author?: IUser;
  public IMG_PATH_START: string = API_GET_NEWS_IMG.START;
  public IMG_PATH_END: string = API_GET_NEWS_IMG.END;

  ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    if(id) this.loadNewsDetails(id);
  }

  private loadNewsDetails(id: string): void {
    this.isLoading = true;

    this.newsService.getNewsById(Number(id))
    .subscribe({
      next: (data) => {
        this.news = data
        this.loadAuthorDetails(this.news.userId)
      },
      error: () => this.openSnackBar("SNACK_BAR.NEWS_DETAILS_NEWS_DETAILS_FAILED"),
    })
    .add(() => this.isLoading = false);
  }

  private loadAuthorDetails(userId: string): void {
    this.isLoading = true;

    this.userService.getUserDetails(userId)
    .subscribe({
      next: (data: IUser) => {
        this.author = data;
      },
      error: () => this.openSnackBar("SNACK_BAR.NEWS_DETAILS_USER_DETAILS_FAILED"),
    }).add(() => this.isLoading = false); 
  }

  private openSnackBar(textKey: string, duration: number = 3000): void {
    this.translateService.get(textKey).subscribe(msg => {
        this.snackBar.open(msg, '', {
          duration: duration
        });
    })
  }
}
