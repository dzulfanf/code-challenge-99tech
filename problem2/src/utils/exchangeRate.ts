/**
 * Calculates the amount received when exchanging one currency for another.
 *
 * @param amount - The amount of the source currency.
 * @param fromPrice - The price of the source currency.
 * @param toPrice - The price of the target currency.
 * @returns The calculated amount of the target currency.
 */
export function calculateExchangeAmount(
  amount: number,
  fromPrice: number,
  toPrice: number,
): number {
  return (amount * fromPrice) / toPrice;
}
