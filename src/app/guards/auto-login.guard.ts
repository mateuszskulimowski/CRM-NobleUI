import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class AutoLoginGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // return this._userService.getMe().pipe(
    //   catchError(() => of('error')),
    //   switchMap((response) =>
    //     this._userService.isVerifiedUser$.pipe(
    //       map((isVerified) =>
    //         response === 'error'
    //           ? true
    //           : isVerified
    //           ? this._router.parseUrl(
    //               activatedRoute.data['redirectAutoLoginUrl'] || '/users'
    //             )
    //           : true
    //       )
    //     )
    //   )
    // );
    return of(true);
  }
}
