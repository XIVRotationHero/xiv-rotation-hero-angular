import { Component } from '@angular/core';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent {
  public visibleDialogs: Set<string> = new Set([ 'builder' ]);

  public toggleDialog(dialog: string) {
    return this.visibleDialogs.has(dialog)
      ? this.visibleDialogs.delete(dialog)
      : this.visibleDialogs.add(dialog)
  }

  public isUserPanelVisible = false;
}
