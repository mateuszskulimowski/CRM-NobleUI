import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { LOCALSTORAGE, LocalStorage } from '../storages/local-storage';
import { CredentialModel } from '../models/credential.model';
import { LoginResponse } from '../responses/login.response';
import { DataResponse } from '../responses/data.response';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _accessTokenSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(
      this._localStorage.getItem('accessToken') || ''
    );
  public accessToken$: Observable<string | null> =
    this._accessTokenSubject.asObservable();

  private _hasSentCodeSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public hasSentCode$: Observable<boolean> =
    this._hasSentCodeSubject.asObservable();

  constructor(
    private _httpClient: HttpClient,
    @Inject(LOCALSTORAGE) private _localStorage: LocalStorage
  ) {}

  register(credential: CredentialModel): Observable<void> {
    return this._httpClient
      .post(`${environment.apiUrl}/register`, {
        data: credential,
      })
      .pipe(map(() => void 0));
  }

  login(
    credential: CredentialModel,
    rememberMe: boolean
  ): Observable<LoginResponse> {
    return this._httpClient
      .post<DataResponse<LoginResponse>>(`${environment.apiUrl}/login`, {
        data: credential,
      })
      .pipe(
        take(1),
        switchMap((response) =>
          this.accessToken$.pipe(
            take(1),
            map((accessToken) => {
              if (accessToken) {
                this.logOut();
                return {
                  accessToken: response.data.accessToken,
                  refreshToken: response.data.refreshToken,
                };
              }
              return {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
              };
            })
          )
        ),

        tap((response) => {
          this._logInUser(response, rememberMe);
        })
      );
  }
  refreshToken(refreshToken: string): Observable<LoginResponse> {
    if (refreshToken === null) {
      return of();
    }
    return this._httpClient
      .post<DataResponse<LoginResponse>>(`${environment.apiUrl}/refresh`, {
        data: { refreshToken: refreshToken },
      })
      .pipe(
        map((response) => {
          return {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          };
        }),
        tap((response) => {
          this._logInUser(response, true);
        })
      );
  }
  verifyPhone(code: number): Observable<void> {
    return this._httpClient
      .post(`${environment.apiUrl}/verify`, { data: { code: code } })
      .pipe(map(() => void 0));
  }
  sendVerificationCode(): Observable<void> {
    return this._httpClient
      .post(`${environment.apiUrl}/send-verification-code`, undefined)
      .pipe(
        map(() => {
          this._hasSentCodeSubject.next(true);
          return void 0;
        })
      );
  }

  logOut(): void {
    this._accessTokenSubject.next('');
    this._localStorage.removeItem('accessToken');
    this._localStorage.removeItem('refreshToken');
  }

  private _logInUser(tokens: LoginResponse, rememberMe: boolean): void {
    this._accessTokenSubject.next(tokens.accessToken);
    if (rememberMe) {
      this._localStorage.setItem('accessToken', tokens.accessToken);
      this._localStorage.setItem('refreshToken', tokens.refreshToken);
    }
  }
}
