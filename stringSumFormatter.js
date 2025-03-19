/**
 * Extracts a single custom delimiter from the input string header.
 *
 * @param {string} header - The first line containing the delimiter definition.
 * @returns {string} The custom delimiter.
 */
function extractDelimiter(header) {
  const delimiter = header.slice(2); // Remove "//" prefix to get the delimiter
  return delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special regex characters
}

/**
 * Extracts multiple custom delimiters from the input string header.
 *
 * @param {string} header - The first line containing multiple delimiters.
 * @returns {string} A regex pattern to split numbers by multiple delimiters.
 */

function extractMultipleDelimiters(header) {
  // Extract delimiters within square brackets and escape special regex characters
  return header
    .match(/\[([^\]]+)\]/g)
    .map(
      (delimiter) =>
        delimiter.slice(1, -1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // Escape special characters
    )
    .join("|"); // Join multiple delimiters with a pipe (|) for regex matching
}

function sumFromString(numbers) {
  if (numbers === "") return 0; // Return 0 if the input is empty

  let delimiter = /,|\n/;

  // Check if the input string contains custom delimiter(s)
  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");

    // Handle multiple custom delimiters (inside square brackets)
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

  // Loop through numbers to sum valid ones and detect negatives
  for (let i = 0; i < numArray.length; i++) {
    if (numArray[i] < 0) {
      negatives.push(numArray[i]); // Record negative numbers
    } else if (numArray[i] <= 1000) {
      sum += numArray[i]; // Ignore numbers greater than 1000
    }
  }

  // Throw error if negative numbers are found
  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
  }

  return sum;
}

module.exports = { sumFromString };
