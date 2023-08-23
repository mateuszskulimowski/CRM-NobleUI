import { NgModule } from '@angular/core';
import { VerifyPage } from './verify.page';
import { AuthenticationLayoutComponentModule } from 'src/app/components/authentication-layout/authentication-layout.component-module';
import { VerifyComponentModule } from 'src/app/components/verify/verify.component-module';

@NgModule({
  imports: [AuthenticationLayoutComponentModule, VerifyComponentModule],
  declarations: [VerifyPage],
  providers: [],
  exports: [VerifyPage],
})
export class VerifyPageModule {}
