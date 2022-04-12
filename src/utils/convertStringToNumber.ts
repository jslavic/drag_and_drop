export function convertStringToNumber(value: string) {
  const numericValue = parseFloat(value.trim());
  if (!numericValue || numericValue === NaN) return 0;
  return numericValue;
}
