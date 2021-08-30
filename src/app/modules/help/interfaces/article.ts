export interface Article {
  title: string;
  path: string;
  children?: Article[]
}