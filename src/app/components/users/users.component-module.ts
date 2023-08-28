import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { IsActiveUserPipeModule } from 'src/app/pipes/is-active-user.pipe-module';

@NgModule({
  imports: [CommonModule, RouterModule, IsActiveUserPipeModule],
  declarations: [UsersComponent],
  providers: [],
  exports: [UsersComponent],
})
export class UsersComponentModule {}
