import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegiserValidationPipeModule } from 'src/app/pipes/regiser-validation.pipe-module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    RegiserValidationPipeModule,
  ],
  declarations: [RegisterComponent],
  providers: [],
  exports: [RegisterComponent],
})
export class RegisterComponentModule {}
