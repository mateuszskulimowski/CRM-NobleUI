import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Pipe({ name: 'regiserValidation' })
export class RegiserValidationPipe implements PipeTransform {
  transform(value: FormGroup): string | null {
    console.log(value.get('phone')?.errors);
    return null;
  }
}
