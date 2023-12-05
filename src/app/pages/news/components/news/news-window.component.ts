import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { OnInit , Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Role } from 'src/app/enums/role.enum';
import { INews } from 'src/app/models/news.model';
import { IUser } from 'src/app/models/user.model';
import { API_GET_NEWS_IMG } from 'src/app/services/api/api.path';
import { NewsService } from 'src/app/services/api/news.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-news-window',
  templateUrl: './news-window.component.html',
  styleUrls: ['./news-window.component.css'], 
  standalone: true,
  imports: [
    CommonModule, MatCardModule, TranslateModule, MatProgressBarModule, RouterLink,
    MatButtonModule
  ]
})
export class NewsWindowComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private newsService: NewsService = inject(NewsService);

  @Input({ required: true }) news!: INews; 
  @Input() isLoading: boolean = false;
  @Input() currentUserRole: Role = Role.ROLE_USER;

  @Output() onDelete = new EventEmitter<number>();
  @Output() onUpdate = new EventEmitter<number>();

  public username?: string;
  public role?: string;
  public Roles = Role
  public IMG_PATH: string = API_GET_NEWS_IMG;
  
  ngOnInit() {
    this.loadAuthorDetails();
  }

  public updateNews(newsId: number): void {
    this.onUpdate.emit(newsId)
  }

  public deleteNews(newsId: number): void {
    this.onDelete.emit(newsId)
  }

  public onLikeAction(newsId: number): void {
     if(this.news.isLikedByUser) this.removeLike(newsId);
     else this.addLike(newsId);
  }

  public onDislikeAction(newsId: number): void {
    if(this.news.isDislikedByUser) this.removeDislike(newsId);
    else this.addDislike(newsId) 
  }

  private loadAuthorDetails(): void {
    this.isLoading = true;

    this.userService.getUserDetails(this.news.userId)
    .subscribe({
      next: (data: IUser) => {
        this.username = data.username;
        this.role = data.role.toString();
      },
      error: (err) => this.handleError(err),
    }).add(() => this.isLoading = false); 
  }

  private addLike(newsId: number): void {
    this.isLoading = true;

    this.newsService.addLike(newsId)
    .subscribe({
      next: () => {
        this.news.isLikedByUser = true;
        this.news.isDislikedByUser = false;
      },
      error: (err) => this.handleError(err),
    }).add(() => this.isLoading = false);
  }

  private removeLike(newsId: number): void {
    this.isLoading = true;

    this.newsService.removeLike(newsId)
    .subscribe({
      next: () => {
        this.news.isLikedByUser = false;
      },
      error: (err) => this.handleError(err),
    }).add(() => this.isLoading = false);
  }

  private addDislike(newsId: number): void {
    this.isLoading = true;

    this.newsService.addDislike(newsId)
    .subscribe({
      next: () => {
        this.news.isDislikedByUser = true;
        this.news.isLikedByUser = false;
      },
      error: (err) => this.handleError(err),
    }).add(() => this.isLoading = false);
  }

  private removeDislike(newsId: number): void {
    this.isLoading = true;

    this.newsService.removeDislike(newsId)
    .subscribe({
      next: () => {
        this.news.isDislikedByUser = false;
      },
      error: (err) => this.handleError(err),
    }).add(() => this.isLoading = false);
  }

  private handleError(err: HttpErrorResponse): void {
    throw new Error('Method not implemented.');
  }

}
