import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { UserResponse } from '../responses/user.response';
import { DataResponse } from '../responses/data.response';
import { UserDataResponse } from '../responses/user-data.response';
import { AddressModel } from '../models/address.model';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _isVerifiedUserSubject = new BehaviorSubject<boolean>(false);
  private _isCompletedSubject = new BehaviorSubject<boolean>(false);

  constructor(private _httpClient: HttpClient) {}
  private _me$: Observable<UserResponse> = this._httpClient
    .get<DataResponse<UserDataResponse<UserResponse>>>(
      `${environment.apiUrl}/me`
    )
    .pipe(
      map((response) => response.data.user),
      tap((response) => {
        this._isCompletedSubject.next(response.isCompleted);
        this._isVerifiedUserSubject.next(response.isVerified);
      })
    );
  getMe(): Observable<UserResponse> {
    return this._me$.pipe(
      switchMap((response) => of(response).pipe(shareReplay(1)))
    );
  }

  addAdress(aderess: AddressModel): Observable<void> {
    return this._httpClient
      .post(`${environment.apiUrl}/my-address`, { data: { aderess } })
      .pipe(map(() => void 0));
  }
  hasRoleAdmin(role: string): Observable<boolean> {
    return of(role === 'admin');
  }

  getUsers(): Observable<UserModel[]> {
    return this._httpClient
      .get<DataResponse<UserModel[]>>(`${environment.apiUrl}/users`)
      .pipe(map((responses) => responses.data));
  }

  removeUser(userId: string): Observable<void> {
    return this._httpClient.delete<void>(
      `${environment.apiUrl}/users/${userId}`
    );
  }
}
