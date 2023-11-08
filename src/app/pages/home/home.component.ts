import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/models/news.model';
import { IPageResponse } from 'src/app/models/page-response.model';
import { IPage } from 'src/app/models/page.model';
import { NewsService } from 'src/app/services/api/news.service';

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
  
  constructor(
    private _newsService: NewsService){}

  ngOnInit(): void {
    this.loadNews();
  }

  public onPageChange(pagination: IPage): void{
    this.itemsPerPage = pagination.itemsPerPage;
    this.currentPage = pagination.currentPage;

    this.loadNews(pagination.currentPage,pagination.itemsPerPage);
  }

  private loadNews(currentPage: number = this.currentPage, itemsPerPage: number = this.itemsPerPage ): void{
    this.isLoading = true;

    this._newsService
    .getNews(currentPage,itemsPerPage)
    .subscribe({
      next: (data: IPageResponse) => {
        this.totalPages = data.totalPages;
        this.news = data.content;
        console.log(this.news);
      },
      error: (err) => this.handleError(err),
    }).add(() => this.isLoading = false); 
  }

  private handleError(err: HttpErrorResponse): void{
    throw new Error('Method not implemented.');
  }
}
