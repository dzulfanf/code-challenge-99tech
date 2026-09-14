/**
 * Formats a numeric value for display in the swap interface.
 *
 * The calculation keeps its original precision, while the UI displays
 * a limited number of significant digits for better readability.
 *
 * @param value - The numeric value to format.
 * @returns A human-readable formatted number.
 */
export function formatAmount(value: number): string {
  return new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 6,
  }).format(value);
}
