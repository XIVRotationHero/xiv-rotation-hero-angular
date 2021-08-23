import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[rhDialogContentHost]'
})
export class DialogContentHostDirective {
  constructor(public readonly viewContainerRef: ViewContainerRef) {
  }
}
