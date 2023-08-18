import { NgModule } from '@angular/core';
import { UsersPage } from './users.page';
import { UsersComponentModule } from 'src/app/components/users/users.component-module';

@NgModule({
  imports: [UsersComponentModule],
  declarations: [UsersPage],
  providers: [],
  exports: [UsersPage],
})
export class UsersPageModule {}
