import { useState } from "react";
import { getTokenIconUrl } from "../utils/tokenIcon";

type TokenIconProps = {
  currency: string;
  size?: number;
};

/**
 * Renders a token icon with a currency initial fallback when
 * the external token icon cannot be loaded.
 *
 * @param props - The component properties.
 * @param props.currency - The currency represented by the icon.
 * @param props.size - The width and height of the icon in pixels.
 * @returns A token icon or a fallback currency initial.
 */
export function TokenIcon({
  currency,
  size = 24,
}: TokenIconProps) {
  const [hasError, setHasError] = useState(false);

  const initial = currency.charAt(0).toUpperCase();

  if (hasError) {
    return (
      <span
        className="token-icon-fallback"
        style={{
          width: size,
          height: size,
        }}
        aria-label={`${currency} token`}
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={getTokenIconUrl(currency)}
      alt={`${currency} token`}
      width={size}
      height={size}
      onError={() => setHasError(true)}
    />
  );
}