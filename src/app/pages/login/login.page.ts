import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AuthenticationLayoutViewModel } from 'src/app/components/authentication-layout/authentication-layout.view-model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  readonly displayed: AuthenticationLayoutViewModel = {
    titleOne: 'Noble',
    titleTwo: 'Invoices',
    description: 'Welcome back! Log in to your account',
  };
}
