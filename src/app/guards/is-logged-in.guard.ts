import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._userService.getMe().pipe(
      catchError((error: HttpErrorResponse) => of('error')),
      map((response) =>
        response === 'error'
          ? this._router.parseUrl(route.data['redirectLoginUrl'])
          : true
      )
    );
  }
}
