import { useState } from "react";
import { CurrencyInput } from "./CurrencyInput";
import { calculateExchangeAmount } from "../utils/exchangeRate";
import { validateAmount } from "../utils/validation";
import type { PriceMap } from "../types/price";

type SwapFormProps = {
  prices: PriceMap;
};

/**
 * Renders the currency swap form and manages its interaction state.
 *
 * @param props - The component properties.
 * @param props.prices - Normalized currency prices used for calculation.
 * @returns A currency swap form component.
 */
export function SwapForm({ prices }: SwapFormProps) {
  const currencies = Object.keys(prices);

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState(
    currencies[0] ?? "",
  );
  const [toCurrency, setToCurrency] = useState(
    currencies[1] ?? "",
  );
  const [amountTouched, setAmountTouched] = useState(false);

  const amountError = amountTouched
    ? validateAmount(amount)
    : null;

  const fromPrice = prices[fromCurrency];
  const toPrice = prices[toCurrency];

  const hasPrices =
    Number.isFinite(fromPrice) &&
    Number.isFinite(toPrice);

  const receivedAmount =
    !amountError && hasPrices
      ? calculateExchangeAmount(
        Number(amount),
        fromPrice,
        toPrice,
      )
      : null;

  /**
   * Swaps the selected source and target currencies.
   *
   * @returns Nothing.
   */
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <main className="swap-page">
      <section className="swap-card">
        <header className="swap-header">
          <h1>Swap</h1>
          <p>Exchange tokens simply</p>
        </header>

        <div className="swap-fields">
          <CurrencyInput
            id="from-amount"
            label="You pay"
            amount={amount}
            currency={fromCurrency}
            currencies={currencies}
            error={amountError}
            onAmountChange={(value) => {
              setAmount(value);
              setAmountTouched(true);
            }}
            onCurrencyChange={setFromCurrency}
          />

          <button
            className="swap-direction"
            type="button"
            onClick={handleSwap}
            aria-label="Swap currencies"
          >
            ↕
          </button>

          <CurrencyInput
            id="to-amount"
            label="You receive"
            amount={
              receivedAmount === null
                ? ""
                : receivedAmount.toString()
            }
            currency={toCurrency}
            currencies={currencies}
            readOnly
            onCurrencyChange={setToCurrency}
          />
        </div>

        {receivedAmount !== null && (
          <div className="exchange-rate">
            1 {fromCurrency} ≈{" "}
            {(
              prices[fromCurrency] /
              prices[toCurrency]
            ).toLocaleString(undefined, {
              maximumFractionDigits: 8,
            })}{" "}
            {toCurrency}
          </div>
        )}

        <button
          className="swap-submit"
          type="button"
          disabled={Boolean(amountError) || !amount}
        >
          Swap
        </button>
      </section>
    </main>
  );
}