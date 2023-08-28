import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordValue = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword');

  if (passwordValue !== confirmPassword?.value) {
    confirmPassword?.setErrors({ valid: false });
    return { confirmPassword: true };
  }
  if (!confirmPassword?.value.length) {
    confirmPassword?.setErrors({ valid: false });
    return { confirmPassword: true };
  }
  confirmPassword?.setErrors(null);

  return null;
};
