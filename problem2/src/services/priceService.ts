import type { Price, PriceMap } from "../types/price";

const PRICES_URL = "https://interview.switcheo.com/prices.json";

/**
 * Fetches currency prices from the price API and normalizes the response.
 *
 * @returns A promise containing normalized currency prices.
 * @throws An error when the API request fails.
 */
export async function fetchPrices(): Promise<PriceMap> {
  const response = await fetch(PRICES_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch prices");
  }

  const data: Price[] = await response.json();

  return normalizePrices(data);
}

/**
 * Fetches currency prices from the price API and normalizes the response.
 *
 * @returns A promise containing normalized currency prices.
 * @throws An error when the API request fails.
 */
export function normalizePrices(prices: Price[]): PriceMap {
  const latestPrices = new Map<string, Price>();

  for (const item of prices) {
    const existing = latestPrices.get(item.currency);

    if (!existing || new Date(item.date) > new Date(existing.date)) {
      latestPrices.set(item.currency, item);
    }
  }

  return Object.fromEntries(
    [...latestPrices].map(([currency, item]) => [currency, item.price]),
  );
}
