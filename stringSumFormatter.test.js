const { sumFromString } = require("./stringSumFormatter");

describe("Basic tests for sumFromString function", () => {
  test("should return 0 for an empty string", () => {
    expect(sumFromString("")).toBe(0);
  });

  test("should return 0 for an empty string", () => {
    expect(sumFromString(null)).toBe(0);
  });

  test("should return 0 for an empty string", () => {
    expect(sumFromString()).toBe(0);
  });

  test("should return the number itself for single number input", () => {
    expect(sumFromString("5")).toBe(5);
  });

  test("should return the sum of two numbers separated by comma", () => {
    expect(sumFromString("1,2")).toBe(3);
  });

  test("should handle new lines between numbers", () => {
    expect(sumFromString("1\n2,3")).toBe(6);
  });

  test("should return the sum of two numbers separated by comma", () => {
    expect(sumFromString("1,2")).toBe(3);
  });

  test("should handle new lines between numbers", () => {
    expect(sumFromString("1\n2,3")).toBe(6);
  });

  test("should handles an unknown amount of numbers", () => {
    expect(sumFromString("1,2,3,4,5,6,7,8,9,10")).toBe(55);
    expect(sumFromString("//;\n1;2;3;4;5;6;7;8;9;10;11;12;13;14;15")).toBe(120);
  });

  test("should support custom delimiter", () => {
    expect(sumFromString("//;\n1;2")).toBe(3);
  });

  test("should support special character delimiters", () => {
    expect(sumFromString("//.\n4.5.6")).toBe(15);
  });

  test("should ignore numbers greater than 1000", () => {
    expect(sumFromString("2,1001")).toBe(2);
  });

  test("should throw error for negative numbers", () => {
    expect(() => sumFromString("1,-2,3,-4")).toThrow(
      "Negatives not allowed: -2, -4"
    );
  });

  test("should ignore numbers greater than 1000 and negative", () => {
    expect(() => sumFromString("-2,1001")).toThrow("Negatives not allowed: -2");
  });

  test("should support single custom delimiter of any length", () => {
    expect(sumFromString("//[***]\n1***2***3")).toBe(6);
  });

  test("should support multiple custom delimiters of any length", () => {
    expect(sumFromString("//[***][%%]\n1***2%%3")).toBe(6);
  });

  test("should ignore numbers greater than 1000 with multiple delimiters", () => {
    expect(sumFromString("//[***][%%]\n2***1001%%3")).toBe(5);
  });

  test("should throw error for negative numbers with multiple delimiters", () => {
    expect(() => sumFromString("//[***][%%]\n1***-2%%3")).toThrow(
      "Negatives not allowed: -2"
    );
  });
});
