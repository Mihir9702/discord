import { __prod__ } from "../constants";

// every validator returns an error message, or null when the value is fine

export const STATUSES = ["online", "idle", "dnd", "offline"];

// usernames are what you log in with - stored lowercase
// (2-32 characters: letters, numbers, underscores and periods)
export function validateUsername(username: string): string | null {
  if (username.length < 2 || username.length > 32) {
    return "Username must be between 2 and 32 characters";
  }
  if (!/^[a-z0-9_.]+$/.test(username)) {
    return "Username can only contain letters, numbers, underscores and periods";
  }
  return null;
}

// validatePasswordStrength: Validates the strength of a password based on specific criteria.
// (e.g., minimum length, presence of uppercase, lowercase, and special characters)
// only enforced in production so local test accounts can use anything
export function validatePassword(
  password: string,
  strict = __prod__
): string | null {
  if (!password) return "Password is required";
  if (password.length > 128) return "Password is too long";
  if (!strict) return null;

  const minimumLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
    password
  );
  if (
    password.length >= minimumLength &&
    hasUppercase &&
    hasLowercase &&
    hasSpecialCharacters
  ) {
    return null;
  }
  return "Password must be at least 8 characters with an uppercase letter, a lowercase letter and a special character";
}

// display names (the "nameId" in nameId#1234)
export function validateNameId(nameId: string): string | null {
  if (nameId.length < 1 || nameId.length > 32) {
    return "Display name must be between 1 and 32 characters";
  }
  if (/[#@:`\n\r]/.test(nameId)) {
    return "Display name can't contain #, @, :, ` or line breaks";
  }
  return null;
}

export function validateStatus(status: string): string | null {
  return STATUSES.includes(status) ? null : "Invalid status";
}

export function validateColor(color: string): string | null {
  return /^#[0-9a-f]{6}$/i.test(color) ? null : "Invalid color";
}

export function validateServerName(name: string): string | null {
  if (name.length < 1 || name.length > 100) {
    return "Server name must be between 1 and 100 characters";
  }
  return null;
}

// empty string clears the icon
export function validateIcon(icon: string): string | null {
  if (icon === "") return null;
  if (icon.length > 2048 || !/^https:\/\/\S+$/.test(icon)) {
    return "Server icon must be an https:// image url";
  }
  return null;
}

// discord style channel names: "My Channel!" -> "my-channel"
export function channelName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 100);
}

export function validateMessage(msg: string): string | null {
  if (!msg) return "Message can't be empty";
  if (msg.length > 2000) return "Message is too long (2000 characters max)";
  return null;
}

// accepts a bare invite code or a full invite url (https://host/invite/code)
export function inviteCode(link: string): string {
  const path = link.trim().split(/[?#]/)[0];
  return path.split("/").filter(Boolean).pop() || "";
}
