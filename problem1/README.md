# Problem 1 — Three Ways to Sum to n

## Problem

Implement `sum_to_n(n)` in three different ways.

Given a non-negative integer `n`, return the sum of all integers from `1` to `n`.

Example:

```text
sum_to_n(5) = 1 + 2 + 3 + 4 + 5 = 15
```

## Assumptions

- `n` is a non-negative integer.
- The result is within `Number.MAX_SAFE_INTEGER`.
- Negative integers are outside the input contract.

## Approaches

### 1. Iterative

The first implementation uses a simple `for` loop to accumulate the sum.

```text
1 + 2 + 3 + ... + n
```

**Complexity:**

- Time: `O(n)`
- Space: `O(1)`

This approach is straightforward and easy to read. It does not require additional memory that grows with the input size.

### 2. Recursive

The second implementation uses recursion:

```text
sum(n) = n + sum(n - 1)
```

The recursion stops when `n` reaches `0`.

**Complexity:**

- Time: `O(n)`
- Space: `O(n)`

Although the recursive implementation is concise, each recursive call uses the call stack. Therefore, its additional space grows with `n`.

For this reason, I would prefer the iterative approach over recursion when both have the same time complexity.

### 3. Mathematical Formula

The third implementation uses the arithmetic series formula:

```text
sum = n * (n + 1) / 2
```

**Complexity:**

- Time: `O(1)`
- Space: `O(1)`

This provides the best asymptotic performance because the calculation requires a constant number of operations regardless of the value of `n`.

The trade-off is readability. The formula is less self-explanatory than the iterative approach, so the implementation includes documentation explaining the formula.

## Comparison

| Approach | Time | Space | Readability |
|---|---:|---:|---|
| Iterative | O(n) | O(1) | High |
| Recursive | O(n) | O(n) | Medium |
| Mathematical | O(1) | O(1) | Medium |

## Preferred Approach

For this specific problem, I would choose the **mathematical approach** because it provides `O(1)` time and `O(1)` space complexity.

However, the iterative approach would also be a strong choice when readability and simplicity are prioritized.

I would not choose the recursive approach for production code here because it provides no asymptotic performance advantage over iteration while requiring `O(n)` call stack space.

## Testing

The implementations were tested with the following inputs:

```text
0  → 0
1  → 1
5  → 15
15 → 120
```

All three implementations produce the expected results.
