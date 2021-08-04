import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {Pagination} from "../../../../../api/interfaces/pagination";

@Component({
  selector: 'rh-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent{
  @Input() pagination?: Pagination = {
    page: 5,
    pagePrev: 4,
    pageNext: 6,
    pageTotal: 10,
    resultsTotal: 100,
    results: 10,
    resultsPerPage: 10
  };

  @Input() pageSpan = 2;

  @Output() selectPage: EventEmitter<number> = new EventEmitter();

  public previousPages: number[] = [];
  public nextPages: number[] = [];

  public ngOnInit() {
    this.calculatePages();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('pagination')) {
      this.calculatePages();
    }
  }

  private calculatePages() {
    if (!this.pagination) {
      this.previousPages = [];
      this.nextPages = [];
      return;
    }

    const { page, pageTotal } = this.pagination;

    this.previousPages =
      Array.from({ length: this.pageSpan })
        .map((value, index) => page - index - 1)
        .filter((value => value >= 1))
        .reverse();

    this.nextPages =
      Array.from({ length: this.pageSpan })
        .map((value, index) => page + index + 1)
        .filter((value => value <= pageTotal));
  }
}
