/**
 * Sums numbers from a string input using default delimiters (comma and newline).
 *
 * @param {string} numbers - The input string containing numbers.
 * @returns {number} The sum of the numbers.
 */
function sumFromString(numbers) {
  // Return 0 if the input string is empty
  if (numbers === "") return 0;

  // Split numbers by default delimiters: comma or newline
  const numArray = numbers.split(/,|\n/).map(Number);
  let sum = 0;

  // Sum all the numbers in the array
  for (let i = 0; i < numArray.length; i++) {
    sum += numArray[i];
  }

  return sum;
}

module.exports = { sumFromString };