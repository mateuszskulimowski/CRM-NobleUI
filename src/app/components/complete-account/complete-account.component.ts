import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-complete-account',
  templateUrl: './complete-account.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleteAccountComponent {
  readonly completeAccountForm: FormGroup = new FormGroup({
    street: new FormControl('', [Validators.required]),
    houseNumber: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  constructor(private _userService: UserService, private _router: Router) { }

  onCompleteAccountFormSubmitted(completeAccountForm: FormGroup): void {
    this._userService
      .addAdress({
        street: completeAccountForm.get('street')?.value,
        houseNumber: completeAccountForm.get('houseNumber')?.value,
        zipCode: completeAccountForm.get('zipCode')?.value,
        city: completeAccountForm.get('city')?.value,
      })
      .subscribe({ next: () => this._router.navigate(['/users']) });
  }
}
