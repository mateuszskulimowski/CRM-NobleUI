import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserResponse } from '../../responses/user.response';
import { UserModel } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  public titles$: Observable<string[]> = of(['#', 'PHONE', 'STATUS', 'ACTION']);
  readonly me$: Observable<UserResponse | null> = this._userService
    .getMe()
    .pipe(
      map((user) => {
        if (!user.isCompleted || !user.isVerified) {
          return null;
        }
        return user;
      })
    );
  private _refreshSubject: BehaviorSubject<void> = new BehaviorSubject<void>(
    void 0
  );
  public refresh$: Observable<void> = this._refreshSubject.asObservable();
  readonly users$: Observable<UserModel[]> = this.refresh$.pipe(
    switchMap(() => this._userService.getUsers())
  );

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _userService: UserService
  ) {}

  logOut(): void {
    this._authenticationService.logOut();
    this._router.navigate(['/login']);
  }

  removeUser(userId: string): void {
    this._userService
      .removeUser(userId)
      .subscribe(() => this._refreshSubject.next());
  }
}
