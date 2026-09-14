import { useEffect, useRef, useState } from "react";
import { TokenIcon } from "./TokenIcon";

type CurrencySelectorProps = {
  currencies: string[];
  value: string;
  onChange: (currency: string) => void;
  exclude?: string;
};

type DropdownPlacement = "top" | "bottom";

/**
 * Renders a searchable currency selector with token icons.
 *
 * The selector supports searching, selecting a currency, closing when
 * clicking outside, closing with the Escape key, and positioning the
 * dropdown based on the available viewport space.
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
  exclude,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [placement, setPlacement] =
    useState<DropdownPlacement>("bottom");

  const selectorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCurrencies = currencies.filter((currency) => {
    const matchesSearch = currency.toLowerCase().includes(search.toLowerCase());

    const isExcluded = currency === exclude;

    return matchesSearch && !isExcluded;
  });

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

  /**
   * Closes the dropdown when the user presses the Escape key.
   *
   * @param event - The keyboard event triggered by the user.
   * @returns Nothing.
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setSearch("");
    }
  };

  /**
   * Closes the dropdown when the user clicks outside the selector.
   *
   * @param event - The pointer event triggered by the user.
   * @returns Nothing.
   */
  const handlePointerDown = (event: PointerEvent) => {
    const target = event.target;

    if (
      target instanceof Node &&
      !selectorRef.current?.contains(target)
    ) {
      setIsOpen(false);
      setSearch("");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (
      !isOpen ||
      !selectorRef.current ||
      !dropdownRef.current
    ) {
      return;
    }

    /**
     * Calculates whether the dropdown should open above or below
     * the currency selector based on the available viewport space.
     *
     * @returns Nothing.
     */
    const updatePlacement = () => {
      const selectorRect =
        selectorRef.current!.getBoundingClientRect();

      const dropdownHeight =
        dropdownRef.current!.getBoundingClientRect().height;

      const spacing = 8;

      const availableBelow =
        window.innerHeight - selectorRect.bottom;

      const availableAbove = selectorRect.top;

      const shouldOpenAbove =
        availableBelow < dropdownHeight + spacing &&
        availableAbove >= dropdownHeight + spacing;

      setPlacement(
        shouldOpenAbove ? "top" : "bottom",
      );
    };

    updatePlacement();

    window.addEventListener("resize", updatePlacement);

    return () => {
      window.removeEventListener(
        "resize",
        updatePlacement,
      );
    };
  }, [isOpen]);

  return (
    <div
      ref={selectorRef}
      className="currency-selector"
    >
      <button
        className="currency-selector-trigger"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <TokenIcon currency={value} />

        <span>{value}</span>

        <span
          className={`currency-selector-chevron ${isOpen
            ? "currency-selector-chevron-open"
            : ""
            }`}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`currency-dropdown currency-dropdown-${placement}`}
        >
          <input
            className="currency-search"
            type="text"
            placeholder="Search token"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            autoFocus
            aria-label="Search token"
          />

          {filteredCurrencies.length > 0 ? (
            <ul
              className="currency-list"
              role="listbox"
              aria-label="Available currencies"
            >
              {filteredCurrencies.map((currency) => {
                const isSelected = currency === value;

                return (
                  <li key={currency}>
                    <button
                      className={`currency-option ${isSelected
                        ? "currency-option-selected"
                        : ""
                        }`}
                      type="button"
                      onClick={() => handleSelect(currency)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <TokenIcon currency={currency} />

                      <span>{currency}</span>

                      {isSelected && (
                        <span
                          className="currency-option-check"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="currency-empty">
              No matching tokens
            </p>
          )}
        </div>
      )}
    </div>
  );
}