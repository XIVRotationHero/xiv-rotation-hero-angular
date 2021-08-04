import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {HotbarService} from "../hotbars/services/hotbar.service";

@Component({
  selector: 'rh-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  public readonly hotbarSettings$ = this.hotbarService.hotbarSettings$;

  constructor(private readonly hotbarService: HotbarService) { }

  ngOnInit(): void {}

}
