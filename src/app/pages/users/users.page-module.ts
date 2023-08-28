import { NgModule } from '@angular/core';
import { UsersPage } from './users.page';
import { UsersComponentModule } from 'src/app/components/users/users.component-module';
import { NavigationComponentModule } from 'src/app/components/navigation/navigation.component-module';

@NgModule({
  imports: [UsersComponentModule, NavigationComponentModule],
  declarations: [UsersPage],
  providers: [],
  exports: [UsersPage],
})
export class UsersPageModule {}
