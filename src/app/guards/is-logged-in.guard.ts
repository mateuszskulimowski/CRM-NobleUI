import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { LOCALSTORAGE, LocalStorage } from '../storages/local-storage';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    @Inject(LOCALSTORAGE) private _localStorage: LocalStorage
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const refreshToken = this._localStorage.getItem('refreshToken');
    return this._userService.getMe().pipe(
      catchError((error: HttpErrorResponse) => of('error')),
      map((response) => {
        if (response === 'error') {
          return this._router.parseUrl(route.data['redirectLoginUrl']);
        }

        return true;
      }),
      switchMap(() =>
        this._authenticationService.accessToken$.pipe(
          map((accessToken) => {
            {
              if (!accessToken && !refreshToken) {
                return this._router.parseUrl(route.data['redirectLoginUrl']);
              }

              return true;
            }
          })
        )
      )
    );
  }
}
