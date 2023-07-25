import { AbstractControl, ValidationErrors } from '@angular/forms';

export function forbiddenSpacesValidation(
  control: AbstractControl
): ValidationErrors | null {
  const forbidden = /\s/.test(control.value);

  return forbidden ? { spaces: { value: forbidden } } : null;
}
