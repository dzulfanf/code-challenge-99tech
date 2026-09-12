/**
 * Returns the sum of all integers from 1 to n.
 * 
 * Assumption:
 * - n is a non-negative integer.
 * - The result is within Number.MAX_SAFE_INTEGER.
 * 
 * Time complexity: O(n)
 * Space complexity: O(1)
 * 
 * @param {number} n  - A non-negative integer.
 * @returns {number} The sum of all integers from 1 to n.
 */
var sum_to_n_a = function (n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};


/**
 * Returns the sum of all integers from 1 to n using recursion.
 * 
 * Assumption:
 * - n is a non-negative integer.
 * - The result is within Number.MAX_SAFE_INTEGER.
 * 
 * Time complexity: O(n)
 * Space complexity: O(n) due to the call stack.
 * 
 * @param {number} n  - A non-negative integer.
 * @returns {number} The sum of all integers from 1 to n.
 */
var sum_to_n_b = function (n) {
  if (n === 0) return 0;

  return n + sum_to_n_b(n - 1);
};

/**
 * Returns the sum of all integers from 1 to n using the arithmetic series formula.
 * 
 * Formula:
 *   sum = n * (n + 1) / 2
 * 
 * Assumption:
 * - n is a non-negative integer.
 * - The result is within Number.MAX_SAFE_INTEGER.
 * 
 * Time complexity: O(1)
 * Space complexity: O(1)
 * 
 * @param {number} n  - A non-negative integer.
 * @returns {number} The sum of all integers from 1 to n.
 */
var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};


// Basic tests for all implementations

console.assert(sum_to_n_a(0) === 0);
console.assert(sum_to_n_a(1) === 1);
console.assert(sum_to_n_a(5) === 15);
console.assert(sum_to_n_a(15) === 120);

console.assert(sum_to_n_b(0) === 0);
console.assert(sum_to_n_b(1) === 1);
console.assert(sum_to_n_b(5) === 15);
console.assert(sum_to_n_b(15) === 120);

console.assert(sum_to_n_c(0) === 0);
console.assert(sum_to_n_c(1) === 1);
console.assert(sum_to_n_c(5) === 15);
console.assert(sum_to_n_c(15) === 120);