export function saveInLocalStorage(key: string, text: string): void {
  return localStorage.setItem(key, text);
}

export function getFromLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}

export function removeFromLocalStorage(key: string): void {
  return localStorage.removeItem(key);
}
