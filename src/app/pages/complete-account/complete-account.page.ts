import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AuthenticationLayoutViewModel } from 'src/app/view-models/authentication-layout.view-model';

@Component({
  selector: 'app-complete-account-page',
  templateUrl: './complete-account.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleteAccountPage {
  readonly displayed: AuthenticationLayoutViewModel = {
    titleOne: 'Noble',
    titleTwo: 'UI',
    description: 'Complete the profile and add your home address.',
  };
}
