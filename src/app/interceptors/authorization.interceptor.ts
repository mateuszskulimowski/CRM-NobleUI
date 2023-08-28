import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  shareReplay,
  switchMap,
  take,
  timeout,
} from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private _authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const blacListUrl = ['/login', '/register'];
    if (blacListUrl.find((blackUrl) => request.url.includes(blackUrl))) {
      return next.handle(request);
    }
    return this._authenticationService.accessToken$.pipe(
      switchMap((accessToken) => {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${accessToken}` },
        });
        return next.handle(request);
      })
    );
  }
}
