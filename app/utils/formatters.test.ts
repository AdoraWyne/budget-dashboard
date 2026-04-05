import { describe, expect, it } from "vitest";
import { formatDate } from "./formatters";

const CASES = [
  {
    input: "2026-01-01",
    expectedResult: "01.01.2026",
  },
  {
    input: "adora-is-aardappel",
    expectedResult: "aardappel.is.adora",
  },
];

describe("FormatDate function", () => {
  CASES.forEach(({ input, expectedResult }) => {
    it(`returns ${expectedResult} when input is ${input}`, () => {
      expect(formatDate(input)).toBe(expectedResult);
    });
  });
});
