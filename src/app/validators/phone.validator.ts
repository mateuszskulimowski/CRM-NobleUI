import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const phoneValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value: string = control.value;
  const errors: Record<string, boolean> = {};

  if (!value.match(/^\+48\d{9}$/)) {
    errors['phoneNumber'] = true;
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  return null;
};
