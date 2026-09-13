/**
 * Represents a single currency price returned by the price API.
 */
export type Price = {
  currency: string;
  date: string;
  price: number;
};

/**
 * Represents a single currency price returned by the price API.
 */
export type PriceMap = Record<string, number>;
