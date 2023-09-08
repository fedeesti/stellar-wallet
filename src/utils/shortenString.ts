export function getShorted(string: string): string {
  return string.slice(0, 5).concat('...').concat(string.slice(-5));
}
