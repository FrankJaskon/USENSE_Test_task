type PasswordStrengthClass = '' | 'easy' | 'medium' | 'strong' | 'invalid';

export function definePasswordStrength(
  isValid: boolean,
  value?: string
): PasswordStrengthClass {
  if (!value || !value.length) return '';
  if (!isValid) return 'invalid';

  const hasSymbol = /[!@#$%^&*()_+=[\]{};':"\\|,.<>?`~]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasLetter = /[\p{L}]/u.test(value);

  if (hasSymbol && hasDigit && hasLetter) {
    return 'strong';
  }
  if (
    (hasSymbol && hasDigit) ||
    (hasSymbol && hasLetter) ||
    (hasDigit && hasLetter)
  ) {
    return 'medium';
  }
  if (hasSymbol || hasDigit || hasLetter) {
    return 'easy';
  }
  return '';
}
