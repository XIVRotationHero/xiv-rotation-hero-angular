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
    return this.request<User>('/auth/login', 'POST', JSON.stringify({email, password}));
  }

  public signUp(email: string, username: string, password: string) {
    return this.request<User>('/auth/signup', 'POST', JSON.stringify({email, password, username}));
  }

  public me(): Observable<User> {
    return this.request<User>('/auth/me', 'GET');
  }

  public verify(token: string): Observable<Response> {
    return this.request<Response>(`/auth/verify/${token}`, 'POST');
  }

  public logout(): Observable<void> {
    return this.request<void>('/auth/logout', 'GET');
  }

  // ROTATIONS
  public createRotation(rotation: RotationCreate): Observable<Rotation> {
    return this.request<Rotation>('/rotation/', 'POST', JSON.stringify(rotation));
  }

  public updateRotation(rotation: RotationUpdate): Observable<Rotation> {
    return this.request<Rotation>(`/rotation/${rotation.id}`, 'PATCH', JSON.stringify(rotation));
  }

  public publishRotation(rotationId: string): Observable<Rotation> {
    return this.request<Rotation>(`/rotation/${rotationId}/publish`, 'POST');
  }

  public favoriteRotation(rotationId: string): Observable<FavouriteResponse> {
    return this.request<FavouriteResponse>(`/rotation/${rotationId}/favourite`, 'POST', '');
  }

  public favoriteRotationWithToken(rotationId: string, token: string): Observable<FavouriteResponse> {
    return this.request<FavouriteResponse>(`/rotation/${rotationId}/favourite/token/${token}`, 'POST', '');
  }

  public getRotation(rotationId: string): Observable<Rotation> {
    return this.request<Rotation>(`/rotation/${rotationId}`, 'GET');
  }

  public getAllRotations(queryParams: RotationQueryParams = {}): Observable<PaginatedResponse<Rotation>> {
    return this.request<PaginatedResponse<Rotation>>(`/rotation/${ApiService.getQueryParamString(queryParams)}`, 'GET');
  }

  // USER
  public userFavourites(queryParams: RotationQueryParams = {}): Observable<PaginatedResponse<Rotation>> {
    return this.request<PaginatedResponse<Rotation>>(`/user/favourites${ApiService.getQueryParamString(queryParams)}`, 'GET');
  }

  public userRotations(queryParams: RotationQueryParams = {}): Observable<PaginatedResponse<Rotation>> {
    return this.request<PaginatedResponse<Rotation>>(`/user/rotations${ApiService.getQueryParamString(queryParams)}`, 'GET');
  }

  public usernameTaken(username: string): Observable<boolean> {
    return this.request<boolean>(`/user/name-taken/${username}`, 'GET');
  }

  public changeUsername(username: string): Observable<User> {
    return this.request<User>(`/user/name`, 'POST', {username});
  }

  // Token
  public userTokenFavourites(token: string): Observable<PaginatedResponse<Rotation>> {
    return this.request<PaginatedResponse<Rotation>>(`/token/${token}/favourites`, 'GET');
  }

  public userTokenRotations(token: string): Observable<PaginatedResponse<Rotation>> {
    return this.request<PaginatedResponse<Rotation>>(`/token/${token}/rotations`, 'GET');
  }

  private request<T>(url: string, method: 'POST' | 'PATCH' | 'GET' | 'DELETE', body?: string | Record<string, unknown>): Observable<T> {
    return this.httpClient.request<T>(
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

  private static getQueryParamString(queryParams: RotationQueryParams): string {
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
