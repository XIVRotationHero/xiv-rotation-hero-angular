export interface Pagination {
  page: number,
  pageTotal: number,
  pageNext: number | null,
  pagePrev: number | null,
  results: number,
  resultsPerPage: number,
  resultsTotal: number
}
