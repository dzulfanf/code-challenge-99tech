import { useState } from "react";
import { CurrencyInput } from "./CurrencyInput";
import { calculateExchangeAmount } from "../utils/exchangeRate";
import { validateAmount } from "../utils/validation";
import type { PriceMap } from "../types/price";
import { formatAmount } from "../utils/formatNumber";
import { normalizeAmount } from "../utils/normalizeAmount";

type SwapFormProps = {
  prices: PriceMap;
};

type SubmitStatus = "idle" | "success" | "error";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");

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

  const isFormValid =
    amount.trim() !== "" &&
    !amountError &&
    hasPrices &&
    fromCurrency !== toCurrency;

  /**
* Updates the amount and resets the previous submission status.
*
* @param value - The new amount entered by the user.
* @returns Nothing.
*/
  const handleAmountChange = (value: string) => {
    setAmount(normalizeAmount(value));
    setAmountTouched(true);
    setSubmitStatus("idle");
  };

  /**
 * Updates the source currency and resets the previous submission status.
 *
 * @param currency - The newly selected source currency.
 * @returns Nothing.
 */
  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency);
    setSubmitStatus("idle");
  };

  /**
   * Updates the target currency and resets the previous submission status.
   *
   * @param currency - The newly selected target currency.
   * @returns Nothing.
   */
  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    setSubmitStatus("idle");
  };

  /**
   * Swaps the selected source and target currencies.
   *
   * @returns Nothing.
   */
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setSubmitStatus("idle");
  };

  /**
 * Simulates submitting a currency swap transaction.
 *
 * The challenge does not provide a real wallet or blockchain transaction
 * service, so the submission is intentionally simulated.
 *
 * @returns A promise that resolves after the simulated transaction completes.
 */
  const submitSwap = async (): Promise<void> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });
  };

  /**
 * Handles the swap form submission and updates the submission state.
 *
 * @returns A promise that resolves when the simulated swap completes.
 */
  const handleSubmit = async (): Promise<void> => {
    if (!isFormValid || isSubmitting) {
      return;
    }

    setSubmitStatus("idle");
    setIsSubmitting(true);

    try {
      await submitSwap();

      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="swap-page">
      <section className="swap-card">
        <header className="swap-header">
          <h1>Swap</h1>
          <p>Exchange tokens simply</p>
        </header>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <div className="swap-fields">
            <CurrencyInput
              id="from-amount"
              label="You pay"
              amount={amount}
              currency={fromCurrency}
              currencies={currencies}
              excludeCurrency={toCurrency}
              error={amountError}
              onAmountChange={handleAmountChange}
              onCurrencyChange={handleFromCurrencyChange}
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
                  : formatAmount(receivedAmount)
              }
              currency={toCurrency}
              currencies={currencies}
              excludeCurrency={fromCurrency}
              readOnly
              onCurrencyChange={handleToCurrencyChange}
            />
          </div>

          {receivedAmount !== null && (
            <div className="exchange-rate">
              1 {fromCurrency} ≈{" "}
              {formatAmount(
                prices[fromCurrency] / prices[toCurrency],
              )}{" "}
              {toCurrency}
            </div>
          )}

          <button
            className="swap-submit"
            type="submit"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Swapping..." : "Swap"}
          </button>

          {submitStatus === "success" && (
            <div className="swap-status swap-status-success" role="status">
              <span
                className="swap-status-icon"
                aria-hidden="true"
              >
                ✓
              </span>

              <span>
                Swap completed successfully.
              </span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="swap-status swap-status-error" role="alert">
              <span
                className="swap-status-icon"
                aria-hidden="true"
              >
                !
              </span>

              <span>
                Unable to complete the swap. Please try again.
              </span>
            </div>
          )}
        </form>

      </section>
    </main>
  );
}