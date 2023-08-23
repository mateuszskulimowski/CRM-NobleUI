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
import { CompleteAccountPage } from './pages/complete-account/complete-account.page';
import { CompleteAccountPageModule } from './pages/complete-account/complete-account.page-module';
import { ProfileCompletedGuard } from './guards/profile-completed.guard';
import { ProfileCompletedGuardModule } from './guards/profile-completed.guard-module';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AutoLoginGuardModule } from './guards/auto-login.guard-module';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [IsVerifiedGuard],
  },
  { path: 'login', component: LoginPage },
  {
    path: 'verify',
    component: VerifyPage,

    canActivate: [IsLoggedInGuard, ProfileCompletedGuard],
  },
  {
    path: 'users',
    component: UsersPage,

    canActivate: [],
  },
  {
    path: 'complete-account',
    component: CompleteAccountPage,
    canActivate: [IsLoggedInGuard, IsVerifiedGuard],
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
    CompleteAccountPageModule,
    ProfileCompletedGuardModule,
    AutoLoginGuardModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
