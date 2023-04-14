import { Link } from "react-router-dom";
import { useQuery, gql, ApolloError } from "@apollo/client";
import Pagination from "./pagination";
import { FilterConfig } from "../utils";

interface GalleryProps {
  filters: FilterConfig;
  page: number;
  onNavigateToPage: (page: number) => void;
}

interface QueryResponse {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: QueryData;
}
interface QueryData {
  characters: QueryCharacters;
}

interface QueryCharacters {
  info: QueryInfo;
  results: CharacterResult[];
}

interface QueryInfo {
  pages: number;
}

interface CharacterResult {
  id: number;
  name: string;
  status: string;
  image: string;
}

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

export default function Gallery({
  filters,
  page,
  onNavigateToPage,
}: GalleryProps) {
  const queryResponse: QueryResponse = useQuery(GET_CHARACTERS, {
    variables: { page, filter: filters },
  });

  const { loading, error, data } = queryResponse;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data || data.characters.results.length === 0) return <p>No results</p>;

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
      <Pagination
        page={page}
        totalPages={data.characters.info.pages}
        onNavigateToPage={onNavigateToPage}
      />
    </>
  );
}
