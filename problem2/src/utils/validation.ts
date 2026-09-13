/**
 * Validates a currency amount entered by the user.
 *
 * @param amount - The amount entered in the currency input.
 * @returns An error message when the amount is invalid, otherwise null.
 */
export function validateAmount(amount: string): string | null {
  if (!amount.trim()) return "Amount is required";

  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) return "Amount must be a valid number";

  if (numericAmount <= 0) return "Amount must be greater than 0";

  return null;
}
