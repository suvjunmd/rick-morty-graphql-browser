import { expect, it } from "vitest";
import { FilterConfig, getFilterConfig } from ".";

it("should return full config when getter has all values", () => {
  const fullConfig: FilterConfig = {
    name: "Rick",
    status: "Alive",
    species: "Human",
    type: "Person",
    gender: "Male",
  };

  function fullGetter(item: string) {
    return fullConfig[item as keyof FilterConfig];
  }

  expect(getFilterConfig(fullGetter)).toEqual(fullConfig);
});

it("should return partial config when getter has some values", () => {
  const partialConfig: FilterConfig = {
    name: "Rick",
    species: "Human",
    gender: "Male",
  };

  function partialGetter(item: string) {
    return partialConfig[item as keyof FilterConfig];
  }

  expect(getFilterConfig(partialGetter)).toEqual(partialConfig);
});

it("should return empty config when getter has no values", () => {
  const emptyConfig: FilterConfig = {};

  function emptyGetter(item: string) {
    return emptyConfig[item as keyof FilterConfig];
  }

  expect(getFilterConfig(emptyGetter)).toEqual(emptyConfig);
});
