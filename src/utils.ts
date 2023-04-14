export interface FilterConfig {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

export const FILTERS = ["name", "status", "species", "type", "gender"];

export function getFiltersFromSearchParams(searchParams: URLSearchParams) {
  const filters: FilterConfig = {};

  FILTERS.forEach((item) => {
    const filterValue = searchParams.get(item);
    if (filterValue) {
      filters[item as keyof FilterConfig] = filterValue;
    }
  });

  return filters;
}
