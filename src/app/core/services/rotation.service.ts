import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Rotation} from "../../modules/api/interfaces/rotation";
import {ApiService} from "../../modules/api/services/api.service";
import {RotationCreate} from "../../modules/api/interfaces/rotation-create";

@Injectable({
  providedIn: 'root'
})
export class RotationService {

  public readonly activeRotation$: Subject<Rotation | null> = new ReplaySubject(1);

  public constructor(private readonly apiService: ApiService) {
  }

  public saveRotation(rotation: RotationCreate): Observable<Rotation> {
    return this.apiService.createRotation(rotation);
  }

  public updateRotation(rotation: Rotation): Observable<Rotation> {
    return this.apiService.updateRotation(rotation);
  }

}
