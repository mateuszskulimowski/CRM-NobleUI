import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { IsActiveUserPipeModule } from '../../pipes/is-active-user.pipe-module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [CommonModule, RouterModule, IsActiveUserPipeModule, MatProgressBarModule, MatCardModule],
  declarations: [UsersComponent],
  providers: [],
  exports: [UsersComponent],
})
export class UsersComponentModule { }
