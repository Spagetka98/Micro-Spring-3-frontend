import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPage } from 'src/app/models/page.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() public currentPage: number = 0;
  @Input() public totalPages: number = 0;
  @Input() public pageSizeOptions: number[] = [];
  @Input() public itemsShowCount: number = 0;
  @Input() public isLoading: boolean = false;

  @Output() public onPageChange: EventEmitter<IPage> = new EventEmitter<IPage>();
 
  public onCountUpdated(count: number){
    if(this.itemsShowCount == count) return;

    this.itemsShowCount = count;
    this.currentPage = 0;

    this.emitPageChange();
  }

  public changePage(page: number){
    const currentPageValue: number = this.currentPage;
    let newPage: number = this.currentPage + page;

    if(newPage > this.totalPages) 
      this.currentPage = this.totalPages;
    else if(newPage < 1)
      this.currentPage = 0;
    else 
      this.currentPage = newPage;

    if(currentPageValue != this.currentPage) this.emitPageChange();
  }

  private emitPageChange(){
    this.onPageChange.emit({
      currentPage: this.currentPage,
      itemsPerPage: this.itemsShowCount
    })
  }

}
