import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/models/comment.model';
import { IPageResponse } from 'src/app/models/page-response.model';
import { IPage } from 'src/app/models/page.model';
import { CommentService } from 'src/app/services/api/comment.service';

@Component({
  selector: 'app-comments-show',
  templateUrl: './comments-show.component.html',
  styleUrls: ['./comments-show.component.css']
})
export class CommentsShowComponent implements OnInit {
  @Input() public isLoading: boolean = false;
  @Input({required:true}) public newsId!: number;

  public currentPage: number = 0;
  public itemsPerPage: number = 5;
  public pageSizeOptions: number[] = [5,10,15,20]
  public totalPages: number = 0;

  public comments: IComment[] = [];

  constructor(private _commentService: CommentService){}

  ngOnInit(): void {
    this.loadComments();
  }

  public onPageChange(pagination: IPage): void {
    this.itemsPerPage = pagination.itemsPerPage;
    this.currentPage = pagination.currentPage;

    this.loadComments(this.newsId,pagination.currentPage,pagination.itemsPerPage);
  }

  private loadComments(newsId:number = this.newsId, currentPage: number = this.currentPage, itemsPerPage: number = this.itemsPerPage): void {
    this.isLoading = true;

    this._commentService
    .getComments(newsId,currentPage,itemsPerPage)
    .subscribe({
      next: (data: IPageResponse) => {
        this.totalPages = data.totalPages;
        this.comments = data.content;
      },
      error: () => console.log("error"),
    }).add(() => this.isLoading = false); 
  }
}
