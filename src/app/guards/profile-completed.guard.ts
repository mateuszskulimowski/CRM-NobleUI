import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ProfileCompletedGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._authenticationService.accessToken$.pipe(
      switchMap((accessToken) => {
        if (!accessToken) {
          return of(true);
        }
        return this._userService.getMe().pipe(
          map((response) => {
            if (response.isVerified) {
              if (response.isCompleted) {
                return this._router.parseUrl(route.data['redirectUsersUrl']);
              }
              return this._router.parseUrl(
                route.data['redirectCompleteAccountUrl']
              );
            }

            return true;
          })
        );
      })
    );
  }
}
