import {Component} from '@angular/core';
import {Rotation} from "../api/interfaces/rotation";
import {ApiService} from "../api/services/api.service";

@Component({
  selector: 'rh-rotation-hero',
  templateUrl: './rotation-hero.component.html',
  styleUrls: ['./rotation-hero.component.scss']
})
export class RotationHeroComponent {

  public activeRotation?: Rotation;

  constructor(private readonly apiService: ApiService) {}

  public selectRotation(rotation: Rotation) {
    this.apiService.getRotation(rotation.id)
      .subscribe((result) => {
        this.activeRotation = result;
      })
  }

  public favouriteRotation(rotation: Rotation) {
    // this.apiService.favoriteRotationWithToken()
  }
}
