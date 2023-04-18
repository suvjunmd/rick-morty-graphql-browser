import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters";
import Gallery from "../components/Gallery";
import { getFilterConfig, FilterConfig } from "../utils";

export default function Root() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const filterConfig = getFilterConfig(
    (item) => searchParams.get(item) || undefined
  );

  function handleFilterSubmit(values: FilterConfig) {
    setSearchParams(values as Record<string, string>);
  }

  function handleNavigateToPage(page: number) {
    setSearchParams({ ...filterConfig, page: page.toString() } as Record<
      string,
      string
    >);
  }

  return (
    <>
      <h1>Rick and Morty GraphQL browser</h1>
      <Filters onSubmit={handleFilterSubmit} {...filterConfig} />
      <Gallery
        filterConfig={filterConfig}
        page={page}
        onNavigateToPage={handleNavigateToPage}
      />
    </>
  );
}
