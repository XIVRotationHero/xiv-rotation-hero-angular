import {ArticleContentType} from "../enums/article-content-type";

export interface ArticleAside {
  type: ArticleContentType;
  content: string;
}
