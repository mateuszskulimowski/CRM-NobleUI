import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyComponent } from './verify.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [VerifyComponent],
  providers: [],
  exports: [VerifyComponent],
})
export class VerifyComponentModule {}
