import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}
  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._userService.getMe().pipe(
      take(1),
      catchError((error: HttpErrorResponse) => of('error')),
      switchMap((response) => {
        console.log('isLoggedIn');
        return this._userService.isVerifiedUser$.pipe(
          map((isVerified) => {
            return response === 'error'
              ? activatedRoute.routeConfig?.path === 'login' ||
                activatedRoute.routeConfig?.path === 'register'
                ? true
                : this._router.parseUrl(
                    activatedRoute.data['redirectLoginUrl'] || '/login'
                  )
              : isVerified
              ? this._router.parseUrl(
                  activatedRoute.data['redirectUsersUrl'] || '/users'
                )
              : true;
          })
        );
      })
    );
  }
}
