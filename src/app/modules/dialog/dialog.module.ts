import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './components/dialog/dialog.component';
import {DialogOutletComponent} from './components/dialog-outlet/dialog-outlet.component';


@NgModule({
  declarations: [
    DialogComponent,
    DialogOutletComponent
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
