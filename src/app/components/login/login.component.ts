import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm: FormGroup = new FormGroup({
    phone: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(),
  });

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {}

  onLoginFormSubmitted(loginForm: FormGroup) {
    this._authenticationService
      .login(
        {
          phone: loginForm.get('phone')?.value,
          password: loginForm.get('password')?.value,
        },
        loginForm.get('rememberMe')?.value
      )
      .subscribe({
        next: () => this._router.navigate(['/users']),
        error: (e) => {
          loginForm.setErrors({ backendError: e.error.message });
          this._cdr.detectChanges();
        },
      });
  }
}
