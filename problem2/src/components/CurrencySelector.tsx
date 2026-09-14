import { useState } from "react";
import TokenIcon from "./TokenIcon";

type CurrencySelectorProps = {
  currencies: string[];
  value: string;
  onChange: (currency: string) => void;
};

/**
 * Renders a searchable currency selector with token icons.
 *
 * @param props - The component properties.
 * @param props.currencies - The available currencies.
 * @param props.value - The currently selected currency.
 * @param props.onChange - Callback triggered when a currency is selected.
 * @returns A searchable currency selector component.
 */
export function CurrencySelector({
  currencies,
  value,
  onChange,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCurrencies = currencies.filter((currency) =>
    currency.toLowerCase().includes(search.toLowerCase()),
  );

  /**
   * Selects a currency and closes the dropdown.
   *
   * @param currency - The currency selected by the user.
   * @returns Nothing.
   */
  const handleSelect = (currency: string) => {
    onChange(currency);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="currency-selector">
      <button
        className="currency-selector-trigger"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <TokenIcon currency={value} />
        <span>{value}</span>
        <span aria-hidden="true">⌄</span>
      </button>

      {isOpen && (
        <div className="currency-dropdown">
          <input
            className="currency-search"
            type="text"
            placeholder="Search token"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            autoFocus
          />

          <ul className="currency-list">
            {filteredCurrencies.map((currency) => (
              <li key={currency}>
                <button
                  className="currency-option"
                  type="button"
                  onClick={() => handleSelect(currency)}
                >
                  <TokenIcon currency={currency} />
                  <span>{currency}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}