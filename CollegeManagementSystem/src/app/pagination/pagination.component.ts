import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() itemsPerPage: number;
  @Input() itemsNumber: number;
  @Input() allPagesNumber: number;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeEvent: EventEmitter<number> = new EventEmitter<number>();

  private _currentPage: number = 1;
  private _currentSize: number = 5;

  pagearray = [1, 2, 3, 4];
  constructor() {}

  ngOnInit(): void {
    const pageCount = this.getPageCount();
  }

  get currentPage(): number {
    return this._currentPage;
  }
  get pageSize(): number {
    return this._currentSize;
  }
  set currentPage(page) {
    this._currentPage = page;
    this.changePage.emit(this.currentPage);
  }
  set pageSize(size) {
    this._currentSize = size;
    this.pageSizeEvent.emit(this.pageSize);
  }
  onSetPage(event): void {
    this.currentPage = event.target.value;
  }
  onSetSize(event): void {
    this.pageSize = event.target.value;
  }

  onFirstPage(): void {
    this.currentPage = 1;
  }

  onLastPage(): void {
    this.currentPage = this.allPagesNumber;
  }

  onNextPage(): void {
    this.currentPage += 1;
  }

  onPreviousPage(): void {
    this.currentPage -= 1;
  }
  pageNumber(i: number) {
    this.currentPage = i;
  }
  createArray() {
    this.pagearray = Array.from(
      { length: this.allPagesNumber },
      (_, index) => index + 1
    );
  }
  private getPageCount(): number {
    let totalPage = 0;

    if (this.itemsNumber > 0 && this.itemsPerPage > 0) {
      const pageCount = this.itemsNumber / this.itemsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage =
        roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }
  private getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }
}
