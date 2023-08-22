import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [UsersComponent],
  providers: [],
  exports: [UsersComponent],
})
export class UsersComponentModule {}
