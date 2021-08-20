import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './components/dialog/dialog.component';
import {DialogOutletComponent} from './components/dialog-outlet/dialog-outlet.component';
import { DialogContentHostDirective } from './directives/dialog-content-host.directive';


@NgModule({
  declarations: [
    DialogComponent,
    DialogOutletComponent,
    DialogContentHostDirective
  ],
  exports: [
    DialogComponent,
    DialogOutletComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DialogModule { }
