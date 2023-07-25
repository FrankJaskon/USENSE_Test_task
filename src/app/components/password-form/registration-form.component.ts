import { Component } from '@angular/core';
import { definePasswordStrength } from 'src/app/shared/definePasswordStrength';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenSpacesValidation } from 'src/app/shared/forbiddenSpacesValidation';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass'],
})
export class RegistrationFormComponent {
  passwordStrengthClass = '';
  minLength = 8;
  maxLength = 25;

  registerForm = this.fb.group({
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(this.minLength),
        Validators.maxLength(this.maxLength),
        forbiddenSpacesValidation,
      ],
    ],
  });

  onInputChange() {
    const inputControl = this.registerForm.value.password;
    this.passwordStrengthClass = inputControl
      ? definePasswordStrength(this.registerForm.valid, inputControl)
      : '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      alert(`Well done! Your password is: ${this.registerForm.value.password}`);
    }
  }

  get isPasswordInvalid(): boolean {
    const passwordControl = this.registerForm.get('password');
    return Boolean(
      passwordControl &&
        passwordControl.invalid &&
        (passwordControl.dirty || passwordControl.touched)
    );
  }

  isPasswordErrorVisible(error: string): boolean {
    const passwordControl = this.registerForm.get('password');
    return Boolean(
      passwordControl &&
        passwordControl.hasError(error) &&
        (passwordControl.dirty || passwordControl.touched)
    );
  }

  constructor(private fb: FormBuilder) {}
}
