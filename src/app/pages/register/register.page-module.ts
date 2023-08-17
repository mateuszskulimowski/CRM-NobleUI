import { NgModule } from '@angular/core';
import { RegisterPage } from './register.page';
import { RegisterComponentModule } from 'src/app/components/register/register.component-module';
import { AuthenticationLayoutComponentModule } from 'src/app/components/authentication-layout/authentication-layout.component-module';

@NgModule({
  imports: [RegisterComponentModule, AuthenticationLayoutComponentModule],
  declarations: [RegisterPage],
  providers: [],
  exports: [RegisterPage],
})
export class RegisterPageModule {}
