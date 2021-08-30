import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Article} from "../../interfaces/article";

@Component({
  selector: 'rh-help-articles',
  templateUrl: './help-articles.component.html',
  styleUrls: ['./help-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpArticlesComponent {

  @Input() public articles: Article[] = [];
  @Input() public selectedArticle: Article[] = [];

  @Output() public selectArticle: EventEmitter<Article[]> = new EventEmitter();

}
