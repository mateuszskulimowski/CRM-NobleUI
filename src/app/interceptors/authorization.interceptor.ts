import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private _authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
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
