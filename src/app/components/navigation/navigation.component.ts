import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  logOut(): void {
    this._authenticationService.logOut();
    this._router.navigate(['/login']);
  }
}
