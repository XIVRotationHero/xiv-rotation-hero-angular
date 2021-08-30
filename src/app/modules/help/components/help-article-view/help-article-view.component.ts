import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Article} from "../../interfaces/article";

@Component({
  selector: 'rh-help-article-view',
  templateUrl: './help-article-view.component.html',
  styleUrls: ['./help-article-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpArticleViewComponent {

  @Input() public selectedArticle: Article[] | null = null;
  @Input() public language: 'en' = 'en';

  private readonly ARTICLE_BASE_PATH = '/assets/help';

  get articlePath(): string {
    if (!this.selectedArticle || this.selectedArticle.length === 0) {
      return '';
    }

    const arrLength = this.selectedArticle.length;
    return this.selectedArticle.reduce((acc, article, index) => {
      return acc + `/${article.path}` + (arrLength === index + 1 ? `/${article.path}.${this.language}.md` : '')
    }, this.ARTICLE_BASE_PATH);
  }

}
