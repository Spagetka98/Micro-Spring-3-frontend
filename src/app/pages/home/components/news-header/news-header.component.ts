import { Component } from '@angular/core';
import { IPageResponse } from 'src/app/models/page-response.model';
import { IPage } from 'src/app/models/page.model';
import { NewsService } from 'src/app/services/api/news.service';

@Component({
  selector: 'app-news-header',
  templateUrl: './news-header.component.html',
  styleUrls: ['./news-header.component.css']
})
export class NewsHeaderComponent{
  public totalPages: number = 0;
  public isLoading: boolean = false;

  constructor(
    private _newsService: NewsService){}

  public onPageChange(pagination: IPage){
    this.isLoading = true;

    this._newsService
    .getNews(pagination.currentPage,pagination.itemsPerPage)
    .subscribe({
      next: (data: IPageResponse) => {
        console.log("gut");
      },
      error: (err) => console.log("h"),
    }).add(() => this.isLoading = false); 
  }

}
