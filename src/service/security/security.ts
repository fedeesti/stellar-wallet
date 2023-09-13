const salt = import.meta.env.SALT;

export function encrypt(text: string): string {
  return btoa(text + salt);
}

export function decrypt(text: string): string {
  const decryptedText = atob(text);
  return decryptedText.replace(salt, '');
}
