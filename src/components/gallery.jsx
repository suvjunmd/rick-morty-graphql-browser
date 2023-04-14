import { Link, useSearchParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { getFiltersFromSearchParams } from "../utils";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
      }
      results {
        id
        name
        status
        image
      }
    }
  }
`;

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const filter = getFiltersFromSearchParams(searchParams);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, filter },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data.characters.results.length === 0) return <p>No results</p>;

  return (
    <>
      <div className="gallery">
        {data.characters.results.map(({ id, name, status, image }) => (
          <div className="gallery-item" key={id}>
            <p>
              <Link to={`/characters/${id}`}>
                {id} - {name}
              </Link>
              {status === "Alive" && <span className="alive" />}
              {status === "Dead" && <span className="dead" />}
              {status === "unknown" && <span className="unknown" />}
            </p>
            <img width="200" height="200" alt="" src={`${image}`} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setSearchParams({ ...filter, page: page - 1 })}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="page-number">
          page {page} of {data.characters.info.pages}
        </div>
        <button
          onClick={() => setSearchParams({ ...filter, page: page + 1 })}
          disabled={page === data.characters.info.pages}
        >
          Next
        </button>
      </div>
    </>
  );
}
