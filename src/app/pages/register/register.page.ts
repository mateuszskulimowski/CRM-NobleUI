import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AuthenticationLayoutViewModel } from 'src/app/components/authentication-layout/authentication-layout.view-model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  readonly displayed: AuthenticationLayoutViewModel = {
    titleOne: 'Noble',
    titleTwo: 'Invoices',
    description: 'Create a free acount.',
  };
}
