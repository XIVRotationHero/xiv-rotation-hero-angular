import {Component} from '@angular/core';
import {Rotation} from "../api/interfaces/rotation";
import {ApiService} from "../api/services/api.service";
import {RotationService} from "../../core/services/rotation.service";

@Component({
  selector: 'rh-rotation-hero',
  templateUrl: './rotation-hero.component.html',
  styleUrls: ['./rotation-hero.component.scss']
})
export class RotationHeroComponent {

  public activeRotation = this.rotationService.activeRotation$;

  constructor(
      private readonly apiService: ApiService,
      private readonly rotationService: RotationService
  ) {
  }

  public selectRotation(rotation: Rotation) {
    this.apiService.getRotation(rotation.id)
        .subscribe((result) => {
          this.activeRotation.next(result);
        })
  }

  public clearRotation() {
    this.activeRotation.next(null);
  }

  public favouriteRotation(rotation: Rotation) {
    // this.apiService.favoriteRotationWithToken()
  }
}
