# 99Tech Frontend Code Challenge

This repository contains my solution to the **Frontend Developer (ReactJS + TypeScript) Code Challenge** from 99Tech / S5 Tech.

## Solutions

### Problem 1 — Three Ways to Sum to `n`

Three different implementations of the same summation problem, focusing on algorithmic trade-offs and complexity:

- Iterative approach
- Recursive approach
- Arithmetic formula

See [`problem1/`](./problem1/).

### Problem 2 — Fancy Form

A currency swap form built with React, TypeScript, and Vite.

The implementation focuses on:

- Currency selection and token icons
- Price fetching and normalization
- Currency conversion
- Input normalization and validation
- Loading and submission states
- Responsive UI
- Accessibility considerations
- Unit tests for utility functions

See [`problem2/`](./problem2/).

### Problem 3 — Messy React

A refactoring exercise based on an intentionally problematic React wallet component.

The refactoring focuses on:

- Correctness
- Type safety
- Derived data and memoization
- React list keys
- Component API simplification
- Separation of static business rules
- Reducing unnecessary transformations
- Maintainability

The original implementation is preserved alongside the refactored implementation for comparison.

See [`problem3/`](./problem3/).

## Repository Structure

```text
.
├── problem1/
│   └── ...
├── problem2/
│   └── ...
├── problem3/
│   ├── original/
│   │   └── WalletPage.tsx
│   ├── refactored/
│   │   └── WalletPage.tsx
│   └── README.md
└── README.md
```

## Approach

The solutions are intentionally focused on solving the requirements without unnecessary complexity.

The main principles applied throughout the challenge are:

- Keep the implementation simple and readable.
- Make correctness the first priority.
- Use TypeScript to make data contracts explicit.
- Separate business logic from presentation when it improves maintainability.
- Avoid premature optimization.
- Prefer small, focused utilities and components.
- Keep the implementation easy to review and test.

## Notes

Each problem contains its own implementation and supporting documentation where applicable.

This repository is submitted as a technical assessment and is intended to demonstrate both implementation ability and the reasoning behind the engineering decisions.
