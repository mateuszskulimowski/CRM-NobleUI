import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';
import { AuthenticationLayoutComponentModule } from 'src/app/components/authentication-layout/authentication-layout.component-module';

@NgModule({
  imports: [AuthenticationLayoutComponentModule],
  declarations: [LoginPage],
  providers: [],
  exports: [LoginPage],
})
export class LoginPageModule {}
