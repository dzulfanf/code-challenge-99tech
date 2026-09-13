const TOKEN_ICON_BASE_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

/**
 * Builds the URL for a currency token icon.
 *
 * @param currency - The currency symbol used by the token icon repository.
 * @returns The URL of the currency token icon.
 */
export function getTokenIconUrl(currency: string): string {
  return `${TOKEN_ICON_BASE_URL}/${currency}.svg`;
}
