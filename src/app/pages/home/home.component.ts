import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/components/enums/role.enum';
import { INews } from 'src/app/models/news.model';
import { IPageResponse } from 'src/app/models/page-response.model';
import { IPage } from 'src/app/models/page.model';
import { NewsService } from 'src/app/services/api/news.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currentPage: number = 0;
  public itemsPerPage: number = 5;
  public pageSizeOptions: number[] = [5,10,15,20]
  public totalPages: number = 0;
  public isLoading: boolean = false;
  public news: INews[] = [];
  public currentUserRole: Role = Role.ROLE_USER;
  
  constructor(
    private _newsService: NewsService,
    private _snackBar: MatSnackBar,
    private _storage: StorageService,
    private _translate: TranslateService,){}

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

    this._newsService
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
    let role = this._storage.getUserRole();
    
    if(role) this.currentUserRole = role;
  }

  private loadNews(currentPage: number = this.currentPage, itemsPerPage: number = this.itemsPerPage): void {
    this.isLoading = true;

    this._newsService
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
    this._translate.get(textKey).subscribe(msg => {
        this._snackBar.open(msg, '', {
          duration: duration
        });
    })
  }
}
