import { useSearchParams } from "react-router-dom";
import { Filters } from "../components/Filters/Filters";
import { Gallery } from "../components/Gallery/Gallery";
import { getFilterConfig, type FilterConfig } from "../utils";

export default function Root() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") ?? "1");
    const filterConfig = getFilterConfig((item) => searchParams.get(item));

    function handleFilterSubmit(values: FilterConfig) {
        const searchParams = new URLSearchParams(Object.entries(values));
        setSearchParams(searchParams);
    }

    function handleNavigateToPage(page: number) {
        const searchParams = new URLSearchParams(
            Object.entries({ ...filterConfig, page: page.toString() }),
        );
        setSearchParams(searchParams);
    }

    return (
        <>
            <h1>Rick and Morty GraphQL browser</h1>
            <Filters
                key={searchParams.toString()}
                onSubmit={handleFilterSubmit}
                {...filterConfig}
            />
            <Gallery
                filterConfig={filterConfig}
                page={page}
                onNavigateToPage={handleNavigateToPage}
            />
        </>
    );
}
