import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
  declarations: [NavigationComponent],
  providers: [],
  exports: [NavigationComponent],
})
export class NavigationComponentModule {}
