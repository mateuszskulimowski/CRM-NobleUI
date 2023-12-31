import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AuthenticationLayoutViewModel } from 'src/app/view-models/authentication-layout.view-model';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyPage {
  readonly displayed: AuthenticationLayoutViewModel = {
    titleOne: 'Noble',
    titleTwo: 'Invoices',
    description: 'Verify your account.',
  };
}
