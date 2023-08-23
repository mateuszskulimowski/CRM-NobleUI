import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserResponse } from '../responses/user.response';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class IsVerifiedGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._authenticationService.accessToken$.pipe(
      switchMap((accessToken) => {
        if (!accessToken) {
          return of(true);
        }
        return this._userService.getMe().pipe(
          map((response) => {
            if (!response.isVerified) {
              return this._router.parseUrl(
                activatedRoute.data['redirectVerifyUrl'] || '/verify'
              );
            }
            return true;
          })
        );
      })
    );
    // return this._userService.getMe().pipe(
    //   take(1),
    //   catchError((x) => {
    //     console.log(x);
    //     return of('error');
    //   }),
    //   switchMap((response) => {
    //     console.log('isVerified');
    //     return this._userService.isVerifiedUser$.pipe(
    //       map((isVerified) => {
    //         console.log('response', response);
    //         console.log('isVerified', isVerified);
    //         return isVerified
    //           ? true
    //           : this._router.parseUrl(
    //               activatedRoute.data['redirectVerifyUrl'] || '/verify'
    //             );
    //         // return isVerified
    //         //   ? true
    //         //   : this._router.parseUrl(
    //         //       activatedRoute.data['redirectVerifyUrl'] || '/verify'
    //         //     );
    //       })
    //     );
    //   })
    // );

    // this._userService.isVerifiedUser$.pipe(
    //   map((isVerified) => {
    //     console.log(!!activatedRoute.routeConfig?.path?.match('register'));
    //     return isVerified
    //       ? this._router.parseUrl(
    //           activatedRoute.data['redirectUsers'] || '/users'
    //         )
    //       : true;
    //   })
    // )

    return of(true);
  }
}
