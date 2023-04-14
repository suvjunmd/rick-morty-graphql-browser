import { Link, useSearchParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
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

export default function Root() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageString = searchParams.get("page");
  const page = pageString ? parseInt(pageString) : 1;
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h1>Rick and Morty GraphQL browser</h1>
      <div class="gallery">
        {data.characters.results.map(({ id, name, status, image }) => (
          <div class="gallery-item" key={id}>
            <p>
              <Link to={`/characters/${id}`}>
                {id} - {name}
              </Link>
              {status === "Alive" && <span class="alive" />}
              {status === "Dead" && <span class="dead" />}
              {status === "unknown" && <span class="unknown" />}
            </p>
            <img width="200" height="200" alt="" src={`${image}`} />
          </div>
        ))}
      </div>
      <button
        onClick={() => setSearchParams({ page: page - 1 })}
        disabled={page === 1}
      >
        Previous
      </button>
      <div>
        page {page} of {data.characters.info.pages}
      </div>
      <button
        onClick={() => setSearchParams({ page: page + 1 })}
        disabled={page === data.characters.info.pages}
      >
        Next
      </button>
    </>
  );
}
