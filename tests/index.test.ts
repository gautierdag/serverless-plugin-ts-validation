const ServerlessTSValidatorPlugin = require("../src/index");

describe("serverless ts validator plugin", () => {
  test("constructor function", () => {
    expect(typeof ServerlessTSValidatorPlugin).toBe("function");
  });
});
