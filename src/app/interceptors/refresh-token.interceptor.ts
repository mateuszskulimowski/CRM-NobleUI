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
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.message);
        if (error.status === 401 && error.error.message === 'invalid token') {
          return this._authenticationService.refreshToken$.pipe(
            switchMap((refreshToken) =>
              this._authenticationService
                .refreshToken(refreshToken as string)
                .pipe(
                  switchMap((response) => {
                    request = request.clone({
                      setHeaders: {
                        Authorization: `Bearer ${response.accessToken}`,
                      },
                    });
                    return next.handle(request);
                  })
                )
            )
          );
        }
        return throwError(() => error);
      })
    );
  }
}
