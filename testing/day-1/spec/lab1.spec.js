const { capitalizeTextFirstChar, createArray, random } = require("../lab1");

describe("capitalizeTextFirstChar", () => {
  it("capitalizes every word and returns a string", () => {
    expect(capitalizeTextFirstChar("i'm Ahmed ali")).toBe("I'm Ahmed Ali");
    expect(typeof capitalizeTextFirstChar("hello world")).toBe("string");
  });

  it("throws TypeError for number input", () => {
    expect(() => capitalizeTextFirstChar(12)).toThrowError(
      TypeError,
      "parameters should be string"
    );
  });
});

describe("createArray", () => {
  it("returns an array", () => {
    expect(Array.isArray(createArray(3))).toBe(true);
  });

  it("returns correct length and includes expected values", () => {
    const arr = createArray(2);
    expect(arr.length).toBe(2);
    expect(arr).toContain(1);
  });

  it("doesn't include the length value", () => {
    const arr = createArray(3);
    // console.log(arr);
    expect(arr).not.toContain(3);
  });
});
