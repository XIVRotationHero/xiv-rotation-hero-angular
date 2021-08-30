import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HelpComponent} from './help.component';
import {HelpArticlesComponent} from './components/help-articles/help-articles.component';
import {HelpArticleViewComponent} from './components/help-article-view/help-article-view.component';
import {MarkdownModule} from "ngx-markdown";


@NgModule({
  declarations: [
    HelpComponent,
    HelpArticlesComponent,
    HelpArticleViewComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule.forChild()
  ],
  exports: [
    HelpComponent
  ]
})
export class HelpModule {
}
