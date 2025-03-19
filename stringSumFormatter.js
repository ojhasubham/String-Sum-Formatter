/**
 * Sums numbers from a string input using default delimiters (comma and newline).
 *
 * @param {string} numbers - The input string containing numbers.
 * @returns {number} The sum of the numbers.
 */
function sumFromString(numbers) {
  if (numbers === "") return 0;

  let delimiter = /,|\n/; // Default delimiters (comma or newline)

  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    delimiter = new RegExp(extractDelimiter(parts[0])); // Extract custom delimiter
    numbers = parts[1]; // Extract the numbers part
  }

  const numArray = numbers.split(delimiter).map(Number);
  let sum = 0;
  for (let i = 0; i < numArray.length; i++) {
    sum += numArray[i]; // Sum the numbers
  }

  return sum;
}



function extractDelimiter(header) {
  const delimiter = header.slice(2); // Extract the delimiter from the header (removes "//" prefix)
  return delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special regex characters in the delimiter
}

module.exports = { sumFromString };