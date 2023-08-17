import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordValue = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword');

  if (passwordValue !== confirmPassword?.value) {
    console.log('niezgodny');
    confirmPassword?.setErrors({ valid: false });
    return { confirmPassword: true };
  }
  if (!confirmPassword?.value.length) {
    console.log('malo liter');
    confirmPassword?.setErrors({ valid: false });
    return { confirmPassword: true };
  }
  confirmPassword?.setErrors(null);
  console.log('true');
  return null;

  //   if (control.get('phone')?.touched) {
  // console.log(!control.get('phone')?.value.match(/^\+48\d{9}$/));
  //     if (!control.get('phone')?.value.match(/\+48\d{9}/)) {
  //       console.log('dupa');
  //     }
  //   }
};
