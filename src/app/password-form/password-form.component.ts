import { Component } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.sass'],
})
export class PasswordFormComponent {
  passwordStrengthClass = '';

  model = new User('');

  submitted = false;

  onInputChange() {
    const inputControl = this.model.password;

    this.passwordStrengthClass = this.definePasswordStrength(inputControl);
  }

  definePasswordStrength(value: string) {
    if (!value.length) return '';

    const spaceRegex = /\s/.test(value);
    if (spaceRegex || value.length < 8) return 'invalid';

    const symbolRegex = /[!@#$%^&*()_+=[\]{};':"\\|,.<>?`~]/.test(value);
    const digitRegex = /\d/.test(value);
    const letterRegex = /[\p{L}]/u.test(value);

    if (symbolRegex && digitRegex && letterRegex) {
      return 'strong';
    }
    if (
      (symbolRegex && digitRegex) ||
      (letterRegex && symbolRegex) ||
      (digitRegex && letterRegex)
    ) {
      return 'medium';
    }
    if (symbolRegex || digitRegex || letterRegex) {
      return 'easy';
    }
    return 'invalid';
  }

  onSubmit() {
    if (
      !this.passwordStrengthClass ||
      this.passwordStrengthClass === 'invalid'
    ) {
      return alert('Password is incorrect :(');
    }
    alert('Well done! Your password has been created');
    this.submitted = true;
  }
}
