import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {shareReplay, switchMap} from "rxjs/operators";
import {Article} from "../interfaces/article";

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  public readonly ARTICLE_INDEX_LOCATION = '/assets/help/index.json';

  public readonly articles$: Observable<Article[]> = of(this.ARTICLE_INDEX_LOCATION)
      .pipe(
          switchMap((fileLocation) => this.httpClient.get<Article[]>(fileLocation)),
          shareReplay(1)
      )

  public constructor(private readonly httpClient: HttpClient) {
  }
}
