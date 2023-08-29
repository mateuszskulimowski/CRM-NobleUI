import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { LOCALSTORAGE, LocalStorage } from '../storages/local-storage';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private _authenticationService: AuthenticationService,
    @Inject(LOCALSTORAGE) private _localStorage: LocalStorage
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const refreshToken = this._localStorage.getItem('refreshToken');
    const blacListUrl = ['/login', '/register'];

    if (blacListUrl.find((blackUrl) => request.url.includes(blackUrl))) {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && refreshToken) {
          return this._authenticationService.refreshToken(refreshToken).pipe(
            switchMap((response) => {
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`,
                },
              });
              return next.handle(request);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
