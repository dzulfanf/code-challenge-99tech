# Problem 2 --- Fancy Form

A currency swap form built with React, TypeScript, and Vite.

## Overview

This implementation focuses on a simple and intuitive swap experience
while keeping the codebase small and maintainable.

The application:

-   Fetches token prices from the provided JSON endpoint.
-   Displays only currencies that have available prices.
-   Uses token icons from the provided token icon repository.
-   Allows users to select and search currencies.
-   Prevents selecting the same currency on both sides.
-   Calculates the estimated received amount from the selected prices.
-   Validates the entered amount.
-   Normalizes unnecessary leading zeros while preserving normal decimal
    input states.
-   Provides a loading skeleton while prices are being fetched.
-   Simulates swap submission with loading and success/error states.
-   Includes unit tests for core utility functions.

## Tech Stack

-   React
-   TypeScript
-   Vite
-   Vitest
-   CSS

## Project Structure

``` text
src/
├── components/
│   ├── CurrencyInput.tsx
│   ├── CurrencySelector.tsx
│   ├── SwapForm.tsx
│   ├── SwapFormSkeleton.tsx
│   └── TokenIcon.tsx
├── services/
│   └── priceService.ts
├── types/
│   └── price.ts
├── utils/
│   ├── exchangeRate.ts
│   ├── formatNumber.ts
│   ├── normalizeAmount.ts
│   ├── tokenIcon.ts
│   └── validation.ts
├── App.tsx
└── index.css
```

## Data Flow

The implementation follows:

**Data → Business Logic → UI**

### Data

`priceService.ts` fetches and normalizes the remote price data.

If multiple price entries exist for the same currency, the latest entry
based on `date` is used.

The normalized result is:

``` ts
type PriceMap = Record<string, number>;
```

Currencies are derived from this normalized price map, so tokens without
prices are automatically excluded.

### Business Logic

Pure utility functions handle calculations and input rules:

-   `calculateExchangeAmount()` calculates the received amount.
-   `normalizeAmount()` removes unnecessary leading zeros.
-   `validateAmount()` validates the entered amount.
-   `formatAmount()` handles presentation formatting.
-   `getTokenIconUrl()` centralizes token icon URL construction.

### UI

React components handle presentation and interaction:

-   `SwapForm` manages form state and submission.
-   `CurrencyInput` renders each currency input section.
-   `CurrencySelector` handles token searching and selection.
-   `TokenIcon` renders token icons.
-   `SwapFormSkeleton` represents the loading state.

## Exchange Calculation

The received amount is calculated from relative token prices:

``` text
receivedAmount = inputAmount × fromPrice ÷ toPrice
```

For example:

``` text
1 token A = $100
1 token B = $50

1 A → 2 B
```

The calculation keeps the numeric value precise. Formatting is applied
only when displaying the result.

## Input Handling

The amount is stored as a string rather than a number.

This allows normal intermediate input states such as:

``` text
""
"0."
"1."
"0.5"
```

Converting to a number on every keystroke can interfere with these
states.

### Leading Zero Normalization

Unnecessary leading zeros are removed:

``` text
01001   → 1001
000100  → 100
000     → 0
01.5    → 1.5
000.25  → 0.25
0.      → 0.
```

## Currency Selection

The currency selector provides:

-   Token search.
-   Token icons.
-   Selected-state feedback.
-   Escape-to-close behavior.
-   Click-outside-to-close behavior.
-   Automatic dropdown placement.

The dropdown opens above the selector when there is insufficient
viewport space below it.

Currencies that cannot be selected because they are already selected on
the other side are omitted from the list.

> If an option can never be selected, removing it is often cleaner than
> showing a disabled option.

## Loading State

The initial price request uses a skeleton UI while real data is being
fetched.

No artificial delay is added just to demonstrate the loading state.

> Never make the application slower just to demonstrate a loading state.

## Submission Flow

The challenge does not provide a real wallet or blockchain transaction
service, so the swap action is intentionally simulated.

``` text
Submit
  ↓
Validate form
  ↓
Set submitting state
  ↓
Simulate transaction
  ↓
Success / Error
  ↓
Reset submitting state
```

The submit button is disabled when the amount is invalid, prices are
unavailable, the selected currencies are the same, or a submission is
already in progress.

## Testing

Vitest is used for unit testing pure utility functions.

Run the test suite:

``` bash
pnpm test
```

Current tests cover:

-   Leading-zero normalization.
-   Decimal input handling.
-   Intermediate decimal states.
-   Exchange-rate calculations.

Pure functions are tested separately because they contain deterministic
business logic and can be tested without rendering React components.

## Performance Considerations

The implementation avoids premature optimization.

The main data transformation is:

``` text
filter → sort
```

Complexity:

-   Filtering: `O(n)`
-   Sorting: `O(n log n)`
-   Overall: `O(n log n)`

`useMemo` is used for derived data where avoiding repeated filtering and
sorting can be beneficial during unrelated renders.

No global state-management library or additional caching layer is
introduced because it is unnecessary for this challenge.

## Accessibility

Basic accessibility considerations include:

-   Semantic `<form>` and submit behavior.
-   Accessible input labels.
-   `aria-expanded` and `aria-haspopup` on the currency selector.
-   `role="listbox"` and `role="option"` for the currency list.
-   `aria-selected` for the selected currency.
-   `role="status"` for success feedback.
-   `role="alert"` for errors.
-   Decorative icons hidden from assistive technology.

## Design Direction

The visual design takes inspiration from modern token-swap interfaces
such as Matcha and Uniswap while keeping the implementation original and
lightweight.

Priorities:

1.  Clear input hierarchy.
2.  Obvious currency selection.
3.  Minimal visual noise.
4.  Clear loading, validation, and submission feedback.
5.  Mobile-friendly layout.
6.  Simple interaction patterns.

## Key Engineering Decisions

### Keep state minimal

Only interactive state is stored in React state.

Derived values are calculated from existing state and fetched data
instead of being duplicated in state.

### Keep calculations separate from presentation

The exchange calculation returns a number.

Number formatting happens only at the UI layer.

### Use the simplest tool that solves the problem

The project uses React state and small pure utilities instead of
introducing unnecessary global state management.

### Prefer explicit behavior

Currency selection, validation, normalization, and submission behavior
are separated into small units so each responsibility is easy to
understand and test.

## Assumptions

-   The price endpoint is the source of truth for available currencies.
-   If a currency has multiple price records, the latest record by
    `date` is used.
-   Tokens without a price are omitted.
-   The swap calculation uses the ratio between the two token prices.
-   The swap transaction is simulated because no real transaction
    backend is provided.
-   Negative amounts are invalid.
-   The form is designed primarily for a mobile-sized viewport.

## Running Locally

Install dependencies:

``` bash
pnpm install
```

Start the development server:

``` bash
pnpm dev
```

Run tests:

``` bash
pnpm test
```

Build for production:

``` bash
pnpm build
```

## Conclusion

Problem 2 is implemented as a small production-style React application
rather than a collection of UI tricks.

The implementation demonstrates:

-   Clear separation of concerns.
-   Correct handling of asynchronous data.
-   Predictable form state.
-   Testable business logic.
-   Practical UX decisions.
-   Reasonable performance without premature optimization.
