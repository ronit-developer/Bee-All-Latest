import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ba-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['pagination.component.scss'],
})

export class PaginationComponent {
  @Input() id: string;
  @Input() currentPage: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() loading: boolean;
  @Input() pagesToShow: number;
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();
  @Output() setPage = new EventEmitter<number>();
  constructor() { }

  getMin(): number {
    return ((this.perPage * this.currentPage) - this.perPage) + 1;
  }

  getMax(): number {
    let max = this.perPage * this.currentPage;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }

  onSetPage(n: number): void {
    this.setPage.emit(n);
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  lastPage(): boolean {
    return this.perPage * this.currentPage > this.count;
  }

  getPages(): number[] {
    const c = Math.ceil(this.count / this.perPage);
    const p = this.currentPage || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }

  trackByIndex(_index: number) {
    return _index;
  }
}
