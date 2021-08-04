import {Pagination} from "./pagination";

export interface PaginatedResponse<T> {
  pagination: Pagination,
  results: T[]
}
