export function getShorted(string: string): string {
  return string.slice(0, 5).concat('...').concat(string.slice(-5));
}

export function shortenDate(date: string): string {
  const regex = /[A-Z]/;
  const splitDate = date.split(regex);

  return `${splitDate[0]} ${splitDate[1].slice(0, 5)}`;
}
