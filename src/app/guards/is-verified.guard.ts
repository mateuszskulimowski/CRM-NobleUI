import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { LOCALSTORAGE, LocalStorage } from '../storages/local-storage';

@Injectable()
export class IsVerifiedGuard implements CanActivate {
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
    return this._authenticationService.accessToken$.pipe(
      switchMap((accessToken) => {
        if (!accessToken && !refreshToken) {
          return of(true);
        }
        return this._userService.getMe().pipe(
          map((response) => {
            if (!response.isVerified) {
              return this._router.parseUrl(route.data['redirectVerifyUrl']);
            } else if (!response.isCompleted) {
              return true;
            }
            return this._router.parseUrl(route.data['redirectUsersUrl']);
          })
        );
      })
    );
  }
}
