// __tests__/addStringBasicTests.test.js
const { sumFromString } = require("./stringSumFormatter");

describe("Basic tests for sumFromString function", () => {
  test("should return 0 for an empty string", () => {
    expect(sumFromString("")).toBe(0);
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
});
