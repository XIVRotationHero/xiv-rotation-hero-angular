import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HelpService} from "./services/help.service";
import {Article} from "./interfaces/article";
import {take} from "rxjs/operators";

@Component({
  selector: 'rh-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpComponent implements OnInit {

  public readonly articles$ = this.helpService.articles$

  public selectedArticle: Article[] = [];

  constructor(
      private readonly helpService: HelpService
  ) {
  }

  ngOnInit(): void {
    this.articles$.pipe(
        take(1)
    ).subscribe((articles) => {
      this.selectedArticle = [articles[0]];
    })
  }

}
