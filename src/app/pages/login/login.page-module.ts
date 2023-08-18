import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';
import { AuthenticationLayoutComponentModule } from 'src/app/components/authentication-layout/authentication-layout.component-module';
import { LoginComponentModule } from 'src/app/components/login/login.component-module';

@NgModule({
  imports: [AuthenticationLayoutComponentModule, LoginComponentModule],
  declarations: [LoginPage],
  providers: [],
  exports: [LoginPage],
})
export class LoginPageModule {}
