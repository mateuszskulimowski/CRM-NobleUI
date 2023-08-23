import { NgModule } from '@angular/core';
import { CompleteAccountPage } from './complete-account.page';
import { CompleteAccountComponentModule } from 'src/app/components/complete-account/complete-account.component-module';
import { AuthenticationLayoutComponentModule } from 'src/app/components/authentication-layout/authentication-layout.component-module';

@NgModule({
  imports: [
    CompleteAccountComponentModule,
    AuthenticationLayoutComponentModule,
  ],
  declarations: [CompleteAccountPage],
  providers: [],
  exports: [CompleteAccountPage],
})
export class CompleteAccountPageModule {}
