import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [UsersComponent],
  providers: [],
  exports: [UsersComponent],
})
export class UsersComponentModule {}
