import { getTokenIconUrl } from '../utils/tokenIcon';

type TokenIconProps = {
  currency: string;
  size?: number;
};

/**
 * Displays the token icon for a currency.
 *
 * @param props - The component properties.
 * @param props.currency - The currency symbol.
 * @param props.size - The width and height of the icon in pixels.
 * @returns A token icon image element.
 */
const TokenIcon = ({
  currency, size = 24
}: TokenIconProps) => {
  return (
    <img
      src={getTokenIconUrl(currency)}
      alt={`${currency} token`}
      width={size}
      height={size}
    />
  );
};

export default TokenIcon;