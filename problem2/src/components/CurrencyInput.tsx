import { CurrencySelector } from "./CurrencySelector";

type CurrencyInputProps = {
  id: string;
  label: string;
  amount: string;
  currency: string;
  currencies: string[];
  readOnly?: boolean;
  error?: string | null;
  onAmountChange?: (amount: string) => void;
  onCurrencyChange: (currency: string) => void;
};

/**
 * Renders a currency amount input with a currency selector.
 *
 * @param props - The component properties.
 * @param props.id - The unique HTML id for the amount input.
 * @param props.label - The accessible label for the input.
 * @param props.amount - The current amount value.
 * @param props.currency - The currently selected currency.
 * @param props.currencies - The available currencies.
 * @param props.readOnly - Whether the amount input can be edited.
 * @param props.error - An optional validation error message.
 * @param props.onAmountChange - Callback triggered when the amount changes.
 * @param props.onCurrencyChange - Callback triggered when the currency changes.
 * @returns A currency input component.
 */
export function CurrencyInput({
  id,
  label,
  amount,
  currency,
  currencies,
  readOnly = false,
  error,
  onAmountChange,
  onCurrencyChange,
}: CurrencyInputProps) {
  return (
    <div>
      <label className="currency-label" htmlFor={id}>{label}</label>

      <div className={`currency-input-box ${error ? "currency-input-box-error" : ""}`}>
        <input
          className="currency-amount"
          id={id}
          type="text"
          inputMode="decimal"
          value={amount}
          readOnly={readOnly}
          onChange={(event) =>
            onAmountChange?.(event.target.value)
          }
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${id}-error` : undefined
          }
        />

        <CurrencySelector
          currencies={currencies}
          value={currency}
          onChange={onCurrencyChange}
        />
      </div>

      {error && (
        <p
          className="currency-error"
          id={`${id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}