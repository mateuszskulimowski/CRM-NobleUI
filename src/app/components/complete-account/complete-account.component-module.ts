import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CompleteAccountComponent } from './complete-account.component';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [CompleteAccountComponent],
  providers: [],
  exports: [CompleteAccountComponent]
})
export class CompleteAccountComponentModule {
}
