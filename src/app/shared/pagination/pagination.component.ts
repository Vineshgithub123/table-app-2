import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  standalone: true,
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  startItem: number = 0;
  endItem: number = 0;

  /**
   * Calculates the total number of pages based on the total number of items and items per page.
   * @returns The total number of pages.
   */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /**
   * Changes the current page to the specified page number, if it is within the valid range.
   * Emits the new page number through the pageChange event emitter.
   * @param page - The page number to switch to.
   */
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  /**
   * Determines the range of pages to display, ensuring that the current page is centered
   * within the range, as long as it is not too close to the beginning or end of the pagination.
   * @returns An array of page numbers to display.
   */
  getPageRange(): number[] {
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);
    let startPage: number, endPage: number;
    if (this.totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      if (this.currentPage <= halfRange) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (this.currentPage + halfRange >= this.totalPages) {
        startPage = this.totalPages - maxPagesToShow + 1;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - halfRange;
        endPage = this.currentPage + halfRange;
      }
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
}
