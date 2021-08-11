import {ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';
import {Action} from "../../interfaces/action";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'rh-action-tooltip',
  templateUrl: './action-tooltip.component.html',
  styleUrls: ['./action-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionTooltipComponent {
  @Input() action!: Action;

  constructor(
    private readonly domSanitizer: DomSanitizer,
    public readonly elementRef: ElementRef) {}

  public getSafeDescription(text: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(text);
  }
}
