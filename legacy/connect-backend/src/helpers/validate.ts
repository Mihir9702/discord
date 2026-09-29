// validateUsername: Validates the username based on specific criteria.
// (e.g., minimum length, presence of uppercase, lowercase, and special characters)
export function validateUsername(username: string): boolean {
  const minimumLength = 3;
  const hasUppercase = /[A-Z]/.test(username);
  const hasLowercase = /[a-z]/.test(username);
  const hasSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
    username
  );
  return (
    username.length >= minimumLength &&
    hasUppercase &&
    hasLowercase &&
    hasSpecialCharacters
  );
}

// validatePasswordStrength: Validates the strength of a password based on specific criteria.
// (e.g., minimum length, presence of uppercase, lowercase, and special characters)
export function validatePassword(password: string): boolean {
  const minimumLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
    password
  );
  return (
    password.length >= minimumLength &&
    hasUppercase &&
    hasLowercase &&
    hasSpecialCharacters
  );
}
