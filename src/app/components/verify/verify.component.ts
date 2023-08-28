import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyComponent {
  readonly verificationCodeForm: FormGroup = new FormGroup({
    code: new FormControl(),
  });
  readonly hasSentCode$: Observable<boolean> =
    this._authenticationService.hasSentCode$;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {}

  sendVerificationCode(): void {
    this.verificationCodeForm.setErrors(null);
    this._authenticationService.sendVerificationCode().subscribe();
  }

  onVerificationCodeFormSubmitted(verificationCodeForm: FormGroup): void {
    this._authenticationService
      .verifyPhone(verificationCodeForm.get('code')?.value)
      .subscribe({
        next: () => {
          location.reload();
          this._router.navigate(['/complete-account']);
        },
        error: () => {
          verificationCodeForm.setErrors({ wrongCode: true });
          this._cdr.detectChanges();
        },
      });
  }
}
