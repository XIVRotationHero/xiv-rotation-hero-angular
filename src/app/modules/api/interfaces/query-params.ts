export interface QueryParams<T> extends Object {
  sortBy?: keyof T
  page?: number
}
