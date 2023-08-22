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
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { IsLoggedInGuardModule } from './guards/is-logged-in.guard-module';
import { IsVerifiedGuard } from './guards/is-verified.guard';
import { IsVerifiedGuardModule } from './guards/is-verified.guard-module';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [IsVerifiedGuard, IsLoggedInGuard],
  },
  { path: 'login', component: LoginPage, canActivate: [IsLoggedInGuard] },
  {
    path: 'verify',
    component: VerifyPage,
    data: { redirectLoginUrl: '/login', redirectUsersUrl: '/users' },
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'users',
    component: UsersPage,
    data: { redirectLoginUrl: '/login', redirectVerifyUrl: '/verify' },
    canActivate: [IsVerifiedGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RegisterPageModule,
    LoginPageModule,
    VerifyPageModule,
    UsersPageModule,
    IsLoggedInGuardModule,
    IsVerifiedGuardModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
