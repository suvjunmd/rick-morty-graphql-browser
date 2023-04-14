import Filters from "../components/filters";
import Gallery from "../components/gallery";

export default function Root() {
  return (
    <>
      <h1>Rick and Morty GraphQL browser</h1>
      <Filters />
      <Gallery />
    </>
  );
}
