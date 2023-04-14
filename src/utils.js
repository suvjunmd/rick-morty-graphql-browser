export const FILTERS = ["name", "status", "species", "type", "gender"];

export function getFiltersFromSearchParams(searchParams) {
  const filters = {};

  FILTERS.forEach((item) => {
    const filterValue = searchParams.get(item);
    if (filterValue) {
      filters[item] = filterValue;
    }
  });

  return filters;
}
