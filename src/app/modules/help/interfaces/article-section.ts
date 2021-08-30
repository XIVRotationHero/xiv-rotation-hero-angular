import {ArticleAside} from "./article-aside";
import {ArticleContentType} from "../enums/article-content-type";

export interface ArticleSection {
  type: ArticleContentType,
  content: string;
  aside?: ArticleAside;
}