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
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._authenticationService.accessToken$.pipe(
      switchMap((accessToken) => {
        return this._userService.getMe().pipe(
          map((response) => {
            console.log(response);
            if (response.isVerified) {
              return this._router.parseUrl(
                activatedRoute.data['redirectCompleteAccount'] ||
                  '/complete-account'
              );
            }
            // return response.isVerified?;
            return true;
          })
        );
      })
    ); // return this._userService.getMe().pipe(
    //   catchError(() => of('error')),
    //   switchMap((response) =>
    //     this._userService.isCompleted$.pipe(
    //       map((isCompleted) => {
    //         console.log(isCompleted);
    //         return response !== 'error'
    //           ? isCompleted
    //             ? true
    //             : this._router.parseUrl(
    //                 activatedRoute.data['redirectCompleteAccountUrl'] ||
    //                   '/complete-account'
    //               )
    //           : this._router.parseUrl('/login');
    //       })
    //     )
    //   )
    // );
    return of(true);
  }
}
