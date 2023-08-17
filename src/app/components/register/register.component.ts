import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { phoneValidator } from 'src/app/validators/phone.validator';
import { passwordValidator } from 'src/app/validators/password.validator';
import { confirmPasswordValidator } from 'src/app/validators/confirmPasword.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly registerForm: FormGroup = new FormGroup(
    {
      phone: new FormControl('', [phoneValidator]),
      password: new FormControl('', [Validators.required, passwordValidator]),
      confirmPassword: new FormControl(),
      isAccept: new FormControl(false, [Validators.requiredTrue]),
    },
    { validators: confirmPasswordValidator }
  );

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  onRegisterFormSubmitter(registerForm: FormGroup): void {
    this._authenticationService
      .register({
        phone: registerForm.get('phone')?.value,
        password: registerForm.get('password')?.value,
      })
      .subscribe({
        next: () => {
          this._router.navigate(['/verify']);
        },
      });
  }
}
