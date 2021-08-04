import { Pipe, PipeTransform } from '@angular/core';
import { GameDataService } from "../../../core/services/game-data.service";
import { Action } from "../interfaces/action";

@Pipe({
  name: 'actionById',
  pure: true
})
export class ActionByIdPipe implements PipeTransform {

  constructor(private readonly gameDataService: GameDataService) {}

  transform(value: number): Action {
    return this.gameDataService.getActionById(value);
  }

}
