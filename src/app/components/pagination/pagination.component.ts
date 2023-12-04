import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { IPage } from 'src/app/models/page.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MatMenuModule, MatButtonModule]
})
export class PaginationComponent {
  private _currentPage: number = 0;
  @Input() public totalPages: number = 0;
  @Input() public pageSizeOptions: number[] = [];
  @Input() public itemsShowCount: number = 0;
  @Input() public isLoading: boolean = false;
  @Input() set currentPage(currentPage: number) {
    this._currentPage = currentPage + 1;
  }
  get currentPage(): number {
    return this._currentPage;
  }

  @Output() public onPageChange: EventEmitter<IPage> = new EventEmitter<IPage>();
 
  public onCountUpdated(count: number){
    if(this.itemsShowCount == count) return;

    this.itemsShowCount = count;
    this._currentPage = 1;

    this.emitPageChange();
  }

  public changePage(page: number){
    const currentPageValue: number = this.currentPage;
    let newPage: number = this.currentPage + page;

    if(newPage > this.totalPages) 
      this._currentPage = this.totalPages;
    else if(newPage < 1)
      this._currentPage = 1;
    else 
      this._currentPage = newPage;

    if(currentPageValue != this.currentPage) this.emitPageChange();
  }

  public emitPageChange(){
    this.onPageChange.emit({
      currentPage: this.currentPage - 1,
      itemsPerPage: this.itemsShowCount
    })
  }

}
