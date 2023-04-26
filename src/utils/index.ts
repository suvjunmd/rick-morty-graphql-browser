export interface FilterConfig {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

export function getFilterConfig(
  getter: (item: string) => string | undefined | null
): FilterConfig {
  const filterNames = ["name", "status", "species", "type", "gender"];
  const filters: FilterConfig = {};

  filterNames.forEach((filterName) => {
    const filterValue = getter(filterName);
    if (filterValue) {
      filters[filterName as keyof FilterConfig] = filterValue;
    }
  });

  return filters;
}
