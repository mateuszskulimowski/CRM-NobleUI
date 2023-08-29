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
import { HomePage } from './pages/home/home.page';
import { HomePageModule } from './pages/home/home.page-module';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterPage,
    data: {
      redirectVerifyUrl: '/verify',
      redirectUsersUrl: '/users',
      redirectCompleteAccountUrl: '/complete-account',
    },
    canActivate: [IsVerifiedGuard, ProfileCompletedGuard],
  },
  { path: 'login', component: LoginPage },
  {
    path: 'verify',
    component: VerifyPage,
    data: {
      redirectLoginUrl: '/login',
      redirectCompleteAccountUrl: '/complete-account',
    },
    canActivate: [IsLoggedInGuard, ProfileCompletedGuard],
  },
  {
    path: 'users',
    component: UsersPage,
    data: { redirectLoginUrl: '/login' },
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'complete-account',
    component: CompleteAccountPage,
    data: {
      redirectLoginUrl: '/login',
      redirectVerifyUrl: '/verify',
      redirectUsersUrl: '/users',
    },
    canActivate: [IsLoggedInGuard, IsVerifiedGuard],
  },
  {
    path: '',
    component: HomePage,
    data: {
      redirectLoginUrl: '/login',
      redirectVerifyUrl: '/verify',
      redirectUsersUrl: '/users',
      redirectCompleteAccountUrl: '/complete-account',
    },
    canActivate: [IsLoggedInGuard, IsVerifiedGuard, ProfileCompletedGuard],
  },
  {
    path: '**',
    component: HomePage,
    data: {
      redirectLoginUrl: '/login',
      redirectVerifyUrl: '/verify',
      redirectUsersUrl: '/users',
      redirectCompleteAccountUrl: '/complete-account',
    },
    canActivate: [IsLoggedInGuard, IsVerifiedGuard, ProfileCompletedGuard],
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
    HomePageModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
