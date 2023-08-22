import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserResponse } from '../responses/user.response';
import { DataResponse } from '../responses/data.response';
import { UserDataResponse } from '../responses/user-data.response';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _isVerifiedUserSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isVerifiedUser$: Observable<boolean> =
    this._isVerifiedUserSubject.asObservable();

  constructor(private _httpClient: HttpClient) {}

  getMe(): Observable<UserResponse> {
    return this._httpClient
      .get<DataResponse<UserDataResponse<UserResponse>>>(
        `${environment.apiUrl}/me`
      )
      .pipe(
        map((response) => ({
          id: response.data.user.id,
          isCompleted: response.data.user.isCompleted,
          isVerified: response.data.user.isVerified,
          role: response.data.user.role,
          phone: response.data.user.phone,
        })),
        tap((response) => this._isVerifiedUserSubject.next(response.isVerified))
      );
  }
}
