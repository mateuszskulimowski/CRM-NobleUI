import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';
import { VerifyPage } from './pages/verify/verify.page';
import { UsersPage } from './pages/users/users.page';
import { RegisterPageModule } from './pages/register/register.page-module';
import { LoginPageModule } from './pages/login/login.page-module';
import { VerifyPageModule } from './pages/verify/verify.page-module';
import { UsersPageModule } from './pages/users/users.page-module';

const routes: Routes = [
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage },
  { path: 'verify', component: VerifyPage },
  { path: 'users', component: UsersPage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RegisterPageModule,
    LoginPageModule,
    VerifyPageModule,
    UsersPageModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
