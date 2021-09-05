import {Injectable} from '@angular/core';
import {RotationCreate} from "../interfaces/rotation-create";
import {RotationUpdate} from "../interfaces/rotation-update";
import {Rotation} from "../interfaces/rotation";
import {FavouriteResponse} from "../interfaces/favourite-response";
import {RotationQueryParams} from "../interfaces/rotation-query-params";
import {PaginatedResponse} from "../interfaces/paginated-response";
import {User} from "../interfaces/user";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_BASE_URL = environment.apiBaseUrl;

  public constructor(private readonly httpClient: HttpClient) {
  }

  // AUTH
  public signIn(email: string, password: string): Observable<User> {
    return this.request('/auth/login', 'POST', JSON.stringify({email, password})) as Observable<User>;
  }

  public signUp(email: string, username: string, password: string) {
    return this.request('/auth/signup', 'POST', JSON.stringify({email, password, username}));
  }

  public me(): Observable<User> {
    return this.request('/auth/me', 'GET') as Observable<User>;
  }

  public verify(token: string): Observable<Response> {
    return this.request(`/auth/verify/${token}`, 'POST') as Observable<Response>;
  }

  public logout() {
    return this.request('/auth/logout', 'GET');
  }

  // ROTATIONS
  public createRotation(rotation: RotationCreate): Observable<Rotation> {
    return this.request('/rotation/', 'POST', JSON.stringify(rotation)) as Observable<Rotation>;
  }

  public updateRotation(rotation: RotationUpdate): Observable<Response> {
    return this.request(`/rotation/${rotation.id}`, 'PATCH', JSON.stringify(rotation)) as Observable<Response>;
  }

  public publishRotation(rotationId: string): Observable<Rotation> {
    return this.request(`/rotation/${rotationId}/publish`, 'POST') as Observable<Rotation>;
  }

  public favoriteRotation(rotationId: string): Observable<FavouriteResponse> {
    return this.request(`/rotation/${rotationId}/favourite`, 'POST', '') as Observable<FavouriteResponse>;
  }

  public favoriteRotationWithToken(rotationId: string, token: string): Observable<FavouriteResponse> {
    return this.request(`/rotation/${rotationId}/favourite/token/${token}`, 'POST', '') as Observable<FavouriteResponse>;
  }

  public getRotation(rotationId: string): Observable<Rotation> {
    return this.request(`/rotation/${rotationId}`, 'GET') as Observable<Rotation>
  }

  public getAllRotations(queryParams: RotationQueryParams = {}): Observable<PaginatedResponse<Rotation>> {
    return this.request(`/rotation/${this.getQueryParamString(queryParams)}`, 'GET') as Observable<PaginatedResponse<Rotation>>;
  }

  // USER
  public userFavourites(queryParams: RotationQueryParams = {}): Observable<PaginatedResponse<Rotation>> {
    return this.request(`/user/favourites${this.getQueryParamString(queryParams)}`, 'GET') as Observable<PaginatedResponse<Rotation>>;
  }

  public userRotations(queryParams: RotationQueryParams = {}): Observable<PaginatedResponse<Rotation>> {
    return this.request(`/user/rotations${this.getQueryParamString(queryParams)}`, 'GET') as Observable<PaginatedResponse<Rotation>>;
  }

  public usernameTaken(username: string): Observable<boolean> {
    return this.request(`/user/name-taken/${username}`, 'GET') as Observable<boolean>;
  }

  public changeUsername(username: string): Observable<User> {
    return this.request(`/user/name`, 'POST', {username}) as Observable<User>;
  }

  // Token
  public userTokenFavourites(token: string): Observable<PaginatedResponse<Rotation>> {
    return this.request(`/token/${token}/favourites`, 'GET') as Observable<PaginatedResponse<Rotation>>;
  }

  public userTokenRotations(token: string): Observable<PaginatedResponse<Rotation>> {
    return this.request(`/token/${token}/rotations`, 'GET') as Observable<PaginatedResponse<Rotation>>;
  }

  private request(url: string, method: 'POST' | 'PATCH' | 'GET' | 'DELETE', body?: string | Record<string, unknown>) {
    return this.httpClient.request(
        method,
        `${this.API_BASE_URL}${url}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          body
        }
    );
  }

  private getQueryParamString(queryParams: RotationQueryParams) {
    const paramArray = [];

    if (queryParams.page) {
      paramArray.push(`page=${queryParams.page}`);
    }
    if (queryParams.sortBy) {
      paramArray.push(`sortBy=${queryParams.sortBy}`);
    }
    if (queryParams.classJobId) {
      paramArray.push(`classJobId=${queryParams.classJobId}`);
    }

    return paramArray.length ? `?${paramArray.join('&')}` : '';
  }
}
