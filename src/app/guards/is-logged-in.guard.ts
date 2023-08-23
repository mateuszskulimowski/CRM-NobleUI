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
    // return this._userService.getMe().pipe(
    //   take(1),
    //   catchError((error: HttpErrorResponse) => of('error')),
    //   map((response) => {
    //     console.log('isLoggedIn');
    //     console.log(activatedRoute.routeConfig?.path);
    //     // return this._userService.isVerifiedUser$.pipe(
    //     //   map((isVerified) => {
    //     return response === 'error'
    //       ? this._router.parseUrl(
    //           activatedRoute.data['redirectLoginUrl'] || '/login'
    //         )
    //       : true;

    // return response === 'error' &&
    //   activatedRoute.routeConfig?.path !== 'login' &&
    //   activatedRoute.routeConfig?.path !== 'register'
    //   ? this._router.parseUrl(
    //       activatedRoute.data['redirectLoginUrl'] || '/login'
    //     )
    //   : response !== 'error'
    //   ? true
    //   : true;
    //   })
    // );
    // })
    // );
    return this._userService.getMe().pipe(
      catchError((error: HttpErrorResponse) => of('error')),
      map((response) =>
        response === 'error'
          ? this._router.parseUrl(
              activatedRoute.data['redirectLoginUrl'] || '/login'
            )
          : true
      )
    );
    return of(true);
  }
}
