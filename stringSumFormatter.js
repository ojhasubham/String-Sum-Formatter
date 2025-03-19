/**
 * Sums numbers from a string input using default delimiters (comma and newline).
 *
 * @param {string} numbers - The input string containing numbers.
 * @returns {number} The sum of the numbers.
 */

function extractDelimiter(header) {
  const delimiter = header.slice(2); // Extract the delimiter from the header (removes "//" prefix)
  return delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special regex characters in the delimiter
}

function extractMultipleDelimiters(header) {
  const matches = header.match(/\[([^\]]+)\]/g);
  const delimiters = [];

  for (let i = 0; i < matches.length; i++) {
    let delimiter = matches[i].slice(1, -1); 
    delimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    delimiters.push(delimiter);
  }

  return delimiters.join("|"); 
}

function sumFromString(numbers) {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    if (parts[0].includes("[") && parts[0].includes("]")) {
      delimiter = new RegExp(extractMultipleDelimiters(parts[0]));
    } else {
      delimiter = new RegExp(extractDelimiter(parts[0]));
    }
    numbers = parts[1];
  }

  const numArray = numbers.split(delimiter).map(Number);
  let sum = 0;
  const negatives = [];

  for (let i = 0; i < numArray.length; i++) {
    if (numArray[i] < 0) {
      negatives.push(numArray[i]);
    } else if (numArray[i] <= 1000) {
      sum += numArray[i];
    }
  }

  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
  }

  return sum;
}

module.exports = { sumFromString };
