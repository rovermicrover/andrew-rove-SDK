import {
  paramsToString,
  paramKeyValueToString,
  indexArgumentsToSearchParams,
} from "../params";

describe("paramsToString", () => {
  test("it handles undefined", () => {
    expect(paramsToString(undefined)).toBe(undefined);
  });

  test("it handles null", () => {
    expect(paramsToString(null)).toBe("null");
  });

  test("it handles a number value", () => {
    expect(paramsToString(2)).toBe("2");
  });

  test("it handles a string value", () => {
    expect(paramsToString("foobar")).toBe("foobar");
  });
});

describe("paramKeyValueToString", () => {
  test("it handles undefined", () => {
    expect(paramKeyValueToString("foo", undefined)).toBe("");
  });

  test("it handles null", () => {
    expect(paramKeyValueToString("foo", null)).toBe("foo");
  });

  test("it handles a value", () => {
    expect(paramKeyValueToString("foo", "2")).toBe("foo=2");
  });
});

describe("indexArgumentsToSearchParams", () => {
  describe("sort", () => {
    test("handles single sort", () => {
      expect(
        indexArgumentsToSearchParams({
          sort: { name: "asc" },
        })
      ).toBe("sort=name:asc");
    });

    test("handles mutiple sorts", () => {
      expect(
        indexArgumentsToSearchParams({
          sort: { name: "asc", age: "desc" },
        })
      ).toBe("sort=name:asc,age:desc");
    });
  });
  describe("match", () => {
    test("handles single match", () => {
      expect(
        indexArgumentsToSearchParams({
          match: { name: "Gandalf" },
        })
      ).toBe("name=Gandalf");
    });

    test("handles mutiple match", () => {
      expect(
        indexArgumentsToSearchParams({
          match: { name: "Gandalf", age: "1000" },
        })
      ).toBe("name=Gandalf&age=1000");
    });

    test("handles mutiple match and a not match", () => {
      expect(
        indexArgumentsToSearchParams({
          match: { name: "Gandalf", age: "1000" },
          notMatch: { realm: "middle earth" },
        })
      ).toBe("name=Gandalf&age=1000&realm!=middle%20earth");
    });
  });

  describe("include", () => {
    test("handles single include", () => {
      expect(
        indexArgumentsToSearchParams({
          include: { name: ["Gandalf", "Bilbo"] },
        })
      ).toBe("name=Gandalf,Bilbo");
    });

    test("handles mutiple match", () => {
      expect(
        indexArgumentsToSearchParams({
          include: { name: ["Gandalf", "Bilbo"], age: ["100", "1000"] },
        })
      ).toBe("name=Gandalf,Bilbo&age=100,1000");
    });

    test("handles mutiple match and a not match", () => {
      expect(
        indexArgumentsToSearchParams({
          include: { name: ["Gandalf", "Bilbo"], age: ["100", "1000"] },
          exclude: { realm: ["middle earth", "alun"] },
        })
      ).toBe("name=Gandalf,Bilbo&age=100,1000&realm!=middle%20earth,alun");
    });

    test("overwrites match", () => {
      expect(
        indexArgumentsToSearchParams({
          include: { name: ["Gandalf", "Bilbo"] },
          match: { name: "Gandalf" },
        })
      ).toBe("name=Gandalf,Bilbo");
    });
  });

  describe("exists", () => {
    test("handles single exists", () => {
      expect(
        indexArgumentsToSearchParams({
          exists: ["name"],
        })
      ).toBe("name");
    });

    test("handles mutiple exists", () => {
      expect(
        indexArgumentsToSearchParams({
          exists: ["name", "age"],
        })
      ).toBe("name&age");
    });

    test("handles mutiple exists and a not exists", () => {
      expect(
        indexArgumentsToSearchParams({
          exists: ["name", "age"],
          notExists: ["realm"],
        })
      ).toBe("name&age&!realm");
    });
  });

  describe("math comparisons", () => {
    test("handles less than", () => {
      expect(
        indexArgumentsToSearchParams({
          lessThan: { age: 100 },
        })
      ).toBe("age<100");
    });

    test("handles greater than", () => {
      expect(
        indexArgumentsToSearchParams({
          greaterThan: { age: 100 },
        })
      ).toBe("age>100");
    });

    test("handles less than or equal", () => {
      expect(
        indexArgumentsToSearchParams({
          lessThanOrEqual: { age: 100 },
        })
      ).toBe("age<=100");
    });

    test("handles greater than or equal", () => {
      expect(
        indexArgumentsToSearchParams({
          greaterThanOrEqual: { age: 100 },
        })
      ).toBe("age>=100");
    });
  });
});
