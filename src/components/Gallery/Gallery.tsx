import { Link } from "react-router-dom";
import { useQuery, gql, ApolloError } from "@apollo/client";
import Pagination from "../Pagination";
import { FilterConfig } from "../../utils";
import styles from "./Gallery.module.css";

interface GalleryProps {
  filterConfig: FilterConfig;
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

export const GET_CHARACTERS_QUERY = gql`
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
  filterConfig,
  page,
  onNavigateToPage,
}: GalleryProps) {
  const queryResponse: QueryResponse = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page, filter: filterConfig },
  });

  const { loading, error, data } = queryResponse;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data || data.characters.results.length === 0) return <p>No results</p>;

  return (
    <>
      <div className={styles.container}>
        {data.characters.results.map(({ id, name, status, image }) => (
          <div
            className={`${styles.card} ${
              status === "Alive" ? styles.statusAlive : ""
            }${status === "Dead" ? styles.statusDead : ""}${
              status === "unknown" ? styles.statusUnknown : ""
            }`}
            key={id}
          >
            <p>
              <Link to={`/characters/${id}`} className={styles.link}>
                {id} - {name}
              </Link>
            </p>
            <img
              width="200"
              height="200"
              alt=""
              src={image}
              className={styles.image}
            />
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
