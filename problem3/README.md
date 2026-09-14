# Problem 3 - Messy React

## Overview
****
This problem presents a React component that displays wallet balances and their corresponding USD values.

The original implementation contains several correctness issues, computational inefficiencies, React anti-patterns, and TypeScript problems.

The goal is to identify these issues, explain their impact, and refactor the implementation without introducing unnecessary complexity.

## Original Behavior

The component is intended to:

1. Retrieve wallet balances.
2. Filter balances based on their amount and supported blockchain.
3. Sort balances by blockchain priority.
4. Calculate the USD value of each balance.
5. Render each balance using `WalletRow`.

The original implementation is preserved in:

`original/WalletPage.tsx`

The refactored implementation will be placed in:

`refactored/WalletPage.tsx`

---

## Problems Identified

### 1. Correctness Issues

#### Undefined variable

The filtering logic creates a variable named `balancePriority`:

```ts
const balancePriority = getPriority(balance.blockchain);
```

but then checks `lhsPriority`:

```ts
if (lhsPriority > -99) {
```

`lhsPriority` is not defined in this scope.

This causes the implementation to fail before the intended filtering logic can execute.

The condition should use the variable that was actually created:

```ts
if (balancePriority > -99) {
```

#### Incorrect balance filtering

The original implementation includes balances when:

```ts
balance.amount <= 0
```

This means zero and negative balances are included while positive balances are excluded.

For a wallet balance list, the intended behavior is to display balances with a positive amount:

```ts
balance.amount > 0
```

This is a correctness issue rather than a performance issue.

### 2. TypeScript Issues

#### Incomplete `WalletBalance` type

The `WalletBalance` interface does not define the `blockchain` property:

```ts
interface WalletBalance {
  currency: string;
  amount: number;
}
```

However, the implementation accesses:

```ts
balance.blockchain
```

This means the type definition does not represent the actual shape of the data being consumed by the component.

The type should include the `blockchain` property:

```ts
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
```

Keeping the type aligned with the actual data allows TypeScript to detect invalid property access during development and makes the component's data contract explicit.

#### Use of `any`

The `blockchain` parameter is typed as `any`:

```ts
const getPriority = (blockchain: any): number => {
```

Using `any` disables TypeScript's type checking for this value.

Since the function only needs a blockchain identifier, `string` is a more appropriate type:

```ts
const getPriority = (blockchain: string): number => {
```

This preserves type safety without introducing unnecessary complexity.

### 3. Computational Inefficiencies

#### Unused `formattedBalances` transformation

The implementation creates a new `formattedBalances` array:

```ts
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed()
  };
});
```

However, this array is never used when rendering the rows.

The component later maps over `sortedBalances` instead:

```ts
const rows = sortedBalances.map(...);
```

This means the first `map()` performs an unnecessary `O(n)` traversal and creates a new array that is immediately discarded.

The formatting can be performed directly when passing the value to `WalletRow`, avoiding the unnecessary transformation.

#### Unnecessary `useMemo` dependency

The sorting calculation uses:

```ts
useMemo(() => {
  // *filter and sort balances*
}, [balances, prices]);
```

However, `prices` is not used anywhere inside the memoized calculation.

When `prices` changes, React will therefore recalculate the filtering and sorting even though the result only depends on `balances`.

The dependency should be limited to:

```ts
[balances]
```

This prevents unnecessary recalculation when prices change.

The refactored implementation keeps `useMemo` because the derived value performs both filtering and sorting.

The calculation depends only on `balances`, so `prices` is not included in the dependency array.

This is a deliberate use of memoization rather than applying `useMemo` to every calculation.

#### Recreating `getPriority` on every render

`getPriority` is declared inside the component:

```ts
const WalletPage: React.FC<Props> = (props: Props) => {
  const getPriority = (blockchain: any): number => {
    // *...*
  };
};
```

This creates a new function instance whenever `WalletPage` renders.

The function does not depend on component state or props, so it can be moved outside the component.

This is a minor optimization rather than a significant performance bottleneck. The main benefit is keeping static business logic independent from the component lifecycle and making the function easier to reuse and test.

### 4. React Anti-Patterns

#### Using array index as a React key

The implementation uses the array index as the key:

```tsx
<WalletRow
  key={index}
/>
```

The list is sorted dynamically, so the position of an item can change between renders.

Using the index as a key means React may associate a different wallet balance with the same key after the list is reordered.

A stable identifier should be used instead, such as a combination of blockchain and currency when that combination is unique:

```tsx
<WalletRow
  key={`${balance.blockchain}-${balance.currency}`}
/>
```

This allows React to correctly track the identity of each wallet balance when the list changes.

#### Redundant prop typing

The original component declares the props type twice:

```ts
const WalletPage: React.FC<Props> = (props: Props) => {
```

`Props` is already provided through `React.FC<Props>` and does not need to be repeated on the function parameter.

Since the custom `Props` interface is also unnecessary, the refactored component uses `BoxProps` directly:

```ts
const WalletPage = (props: BoxProps) => {
```

This removes redundant typing and unnecessary type indirection.

#### Unused `children` prop

The component extracts `children` from the props:

```ts
const { children, ...rest } = props;
```

However, `children` is never rendered or otherwise used.

This creates an unnecessary variable and makes the component API appear to support content that the component does not actually consume.

Since `children` is not part of the component's intended behavior, it is not extracted in the refactored implementation.

#### Unnecessary prop extension

The component defines:

```ts
interface Props extends BoxProps {
}
```

The interface does not add any properties to `BoxProps`.

An empty extension provides no additional type information and adds unnecessary indirection.

If the component only needs `BoxProps`, the type can be used directly:

```ts
const WalletPage = (props: BoxProps) => {
```

If custom props are introduced later, a dedicated `Props` type can then extend `BoxProps`.

### 5. Maintainability Issues

#### Static business rules can be separated from the component

The blockchain priority logic is defined inside `WalletPage` in the original implementation:

```ts
const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};
```

This makes the component responsible for both rendering and maintaining a static business rule.

In the refactored implementation, the static priority configuration is moved outside the component:

```ts
const BLOCKCHAIN_PRIORITY: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const DEFAULT_PRIORITY = -99;
```

The priority lookup is then handled by a small helper function:

```ts
const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITY[blockchain] ?? DEFAULT_PRIORITY;
};
```

This keeps static configuration independent from the component lifecycle and makes the business rule easier to maintain and test.

#### Multiple transformations make the data flow harder to follow

The original implementation creates:

```text
balances
  ↓
sortedBalances
  ↓
formattedBalances
  ↓
rows
```

However, `formattedBalances` is not actually used when creating `rows`.

This makes the data flow harder to understand and increases the amount of code that a developer needs to reason about.

The refactored implementation keeps the transformation pipeline as simple as possible:

```text
balances
  ↓
filter + sort
  ↓
render
```

Formatting and USD value calculation can happen at the presentation boundary where they are needed.

## Summary

| Category | Issue | Impact |
|---|---|---|
| Correctness | Undefined `lhsPriority` | Prevents the filtering logic from executing correctly |
| Correctness | Incorrect balance condition | Positive balances are excluded |
| TypeScript | Incomplete `WalletBalance` type | `blockchain` access is not represented by the type |
| TypeScript | Use of `any` | Disables type checking for `blockchain` |
| Performance | Unused `formattedBalances` | Unnecessary `O(n)` traversal and array allocation |
| Performance | Incorrect `useMemo` dependency | Causes unnecessary filtering and sorting when prices change |
| Performance | `getPriority` recreated on render | Minor unnecessary function recreation |
| React | Array index used as key | Unstable identity when the list is reordered |
| React | Redundant prop typing | Adds unnecessary type syntax and indirection |
| React | Unused `children` | Unused value and misleading component API |
| React | Empty `Props` extension | Adds unnecessary type indirection |
| Maintainability | Business rules inside component | Makes static configuration harder to maintain |
| Maintainability | Multiple unnecessary transformations | Makes the data flow harder to understand |

## Refactoring Strategy

The refactoring will follow a priority-based approach:

1. Fix correctness issues first.
2. Align TypeScript types with the actual data being consumed.
3. Remove unnecessary data transformations and recalculations.
4. Use stable React keys for dynamically sorted lists.
5. Simplify the component API and remove unused props.
6. Move static business rules outside the component.
7. Keep `useMemo` only where it provides a clear benefit.
8. Avoid introducing unnecessary abstractions or libraries.

The goal is not to rewrite the component completely, but to make the smallest set of changes that improves correctness, performance, type safety, and maintainability.