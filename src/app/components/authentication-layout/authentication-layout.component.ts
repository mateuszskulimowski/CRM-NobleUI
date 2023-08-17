import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { AuthenticationLayoutViewModel } from './authentication-layout.view-model';

@Component({
  selector: 'app-authentication-layout',
  templateUrl: './authentication-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationLayoutComponent {
  @Input() displayed: AuthenticationLayoutViewModel = {
    titleOne: '',
    titleTwo: '',
    description: '',
  };
}
