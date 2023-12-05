import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/enums/role.enum';
import { INews } from 'src/app/models/news.model';
import { IPageResponse } from 'src/app/models/page-response.model';
import { IPage } from 'src/app/models/page.model';
import { NewsService } from 'src/app/services/api/news.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { NewsWindowComponent } from "./components/news/news-window.component";

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    standalone: true,
    imports: [
      CommonModule, TranslateModule, MatProgressBarModule, PaginationComponent, NewsWindowComponent,
      MatSnackBarModule
    ]
})
export class NewsComponent implements OnInit {
  private newsService: NewsService = inject(NewsService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private storageService: StorageService = inject(StorageService);
  private translateService: TranslateService = inject(TranslateService);

  public currentPage: number = 0;
  public itemsPerPage: number = 5;
  public pageSizeOptions: number[] = [5,10,15,20]
  public totalPages: number = 0;
  public isLoading: boolean = false;
  public news: INews[] = [];
  public currentUserRole: Role = Role.ROLE_USER;

  ngOnInit(): void {
    this.loadUserRole();
    this.loadNews();  
  }

  public onPageChange(pagination: IPage): void {
    this.itemsPerPage = pagination.itemsPerPage;
    this.currentPage = pagination.currentPage;

    this.loadNews(pagination.currentPage,pagination.itemsPerPage);
  }

  public updateNews(newsId: number): void {
    throw new Error('Method not implemented.');
  }

  public deleteNews(newsId: number): void {
    this.isLoading = true;

    this.newsService
    .deleteNews(newsId)
    .subscribe({
      next: () => {
        if(this.news.length <= 1) this.currentPage = (this.currentPage - 1) < 0 ? 0 : this.currentPage - 1;
        this.openSnackBar("SNACK_BAR.NEWS_DELETE_SUCCESS");
        this.loadNews()
      },
      error: () => {
        this.isLoading = false;
        this.openSnackBar("SNACK_BAR.NEWS_DELETE_FAILED",5000)
      },
    })

  }

  private loadUserRole(): void {
    let role = this.storageService.getUserRole();
    
    if(role) this.currentUserRole = role;
  }

  private loadNews(currentPage: number = this.currentPage, itemsPerPage: number = this.itemsPerPage): void {
    this.isLoading = true;

    this.newsService
    .getNews(currentPage,itemsPerPage)
    .subscribe({
      next: (data: IPageResponse) => {
        this.totalPages = data.totalPages;
        this.news = data.content;
      },
      error: () => this.openSnackBar("SNACK_BAR.NEWS_LOAD_FAILED",5000),
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
