/**
 * Normalizes a user-entered amount by removing unnecessary leading zeros.
 *
 * Decimal values and intermediate input states are preserved so the function
 * does not interfere with normal typing behavior.
 *
 * @param value - The raw amount entered by the user.
 * @returns The normalized amount string.
 */
export function normalizeAmount(value: string): string {
  if (value === "") {
    return "";
  }

  const [integerPart, decimalPart] = value.split(".");

  const normalizedInteger = integerPart.replace(/^0+(?=\d)/, "") || "0";

  if (decimalPart === undefined) {
    return normalizedInteger;
  }

  return `${normalizedInteger}.${decimalPart}`;
}
