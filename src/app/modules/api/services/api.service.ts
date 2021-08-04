import { Injectable } from '@angular/core';
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
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_BASE_URL = environment.apiBaseUrl;

  public constructor(private readonly httpClient: HttpClient) {}

  // AUTH
  signIn(email: string, password: string): Observable<User> {
    return this.request('/auth/login', 'POST', JSON.stringify({ email, password })) as Observable<User>;
  }

  signUp(email: string, username: string, password: string) {
    return this.request('/auth/signup', 'POST', JSON.stringify({ email, password, username }));
  }

  me(): Observable<User> {
    return this.request('/auth/me', 'GET') as Observable<User>;
  }

  verify(token: string): Observable<Response> {
    return this.request(`/auth/verify/${token}`, 'POST') as Observable<Response>;
  }

  logout() {
    return this.request('/auth/logout', 'GET');
  }

  // ROTATIONS
  createRotation(rotation: RotationCreate): Observable<Response> {
    return this.request('/rotation/', 'POST', JSON.stringify(rotation)) as Observable<Response>;
  }

  updateRotation(rotation: RotationUpdate): Observable<Response> {
    return this.request(`/rotation/${rotation.id}`, 'PATCH', JSON.stringify(rotation)) as Observable<Response>;
  }

  publishRotation(rotationId: string): Observable<Rotation> {
    return this.request(`/rotation/${rotationId}/publish`, 'POST') as Observable<Rotation>;
  }

  favoriteRotation(rotationId: string): Observable<FavouriteResponse> {
    return this.request(`/rotation/${rotationId}/favourite`, 'POST', '') as Observable<FavouriteResponse>;
  }

  favoriteRotationWithToken(rotationId: string, token: string): Observable<FavouriteResponse> {
    return this.request(`/rotation/${rotationId}/favourite/token/${token}`, 'POST', '') as Observable<FavouriteResponse>;
  }

  getRotation(rotationId: string): Observable<Rotation> {
    return this.request(`/rotation/${rotationId}`, 'GET') as Observable<Rotation>
  }

  getAllRotations(queryParams: RotationQueryParams = {}): Observable<PaginatedResponse<Rotation>> {
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

    const paramString = paramArray.length ? `?${paramArray.join('&')}` : '';

    return this.request(`/rotation/${ paramString }`, 'GET') as Observable<PaginatedResponse<Rotation>>;
  }

  // USER
  userFavourites(): Observable<PaginatedResponse<Rotation>> {
    return this.request('/user/favourites', 'GET') as Observable<PaginatedResponse<Rotation>>;
  }

  userRotations(): Observable<PaginatedResponse<Rotation>> {
    return this.request('/user/rotations', 'GET') as Observable<PaginatedResponse<Rotation>>;
  }

  // Token
  userTokenFavourites(token: string): Observable<PaginatedResponse<Rotation>> {
    return this.request(`/token/${token}/favourites`, 'GET') as Observable<PaginatedResponse<Rotation>>;
  }

  userTokenRotations(token: string): Observable<PaginatedResponse<Rotation>> {
    return this.request(`/token/${token}/rotations`, 'GET') as Observable<PaginatedResponse<Rotation>>;
  }

  private request(url: string, method: 'POST' | 'PATCH' | 'GET' | 'DELETE', body?: string) {
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
}
