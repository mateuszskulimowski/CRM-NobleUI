import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPage } from './pages/register/register.page';
import { RegisterPageModule } from './pages/register/register.page-module';

const routes: Routes = [{ path: 'register', component: RegisterPage }];

@NgModule({
  imports: [RouterModule.forRoot(routes), RegisterPageModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
