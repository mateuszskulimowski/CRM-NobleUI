import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  const errors: Record<string, boolean> = {};

  //   console.log(value.match(/_/));
  if (!value.match(/(?=.*[a-z].*[a-z]){2}/)) {
    errors['smallCharacter'] = true;
  }
  if (!value.match(/(?=.*[A-Z].*[A-Z]){2}/)) {
    errors['capitalCharacter'] = true;
  }
  if (!value.match(/\d/)) {
    errors['numberCharacter'] = true;
  }
  if (!value.match(/_/)) {
    errors['underscoreCharacter'] = true;
  }
  if (!value.match(/\S{6}/)) {
    errors['minLength'] = true;
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  return null;
};
