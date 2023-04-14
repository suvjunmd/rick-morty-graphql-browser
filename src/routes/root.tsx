import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import Filters from "../components/filters";
import Gallery from "../components/gallery";
import { getFiltersFromSearchParams, FilterConfig } from "../utils";

export default function Root() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const filters = getFiltersFromSearchParams(searchParams);

  function handleFilterSubmit(values: FilterConfig) {
    setSearchParams(values as Record<string, string>);
  }

  function handleNavigateToPage(page: number) {
    setSearchParams({ ...filters, page: page.toString() } as Record<string, string>);
  }

  return (
    <>
      <h1>Rick and Morty GraphQL browser</h1>
      <Filters onSubmit={handleFilterSubmit} {...filters} />
      <Gallery
        filters={filters}
        page={page}
        onNavigateToPage={handleNavigateToPage}
      />
    </>
  );
}