import { NgModule } from '@angular/core';
import { VerifyPage } from './verify.page';
import { AuthenticationLayoutComponentModule } from 'src/app/components/authentication-layout/authentication-layout.component-module';

@NgModule({
  imports: [AuthenticationLayoutComponentModule],
  declarations: [VerifyPage],
  providers: [],
  exports: [VerifyPage],
})
export class VerifyPageModule {}
