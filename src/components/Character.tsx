
import { useQuery, gql, ApolloError } from "@apollo/client";

interface CharacterProps {
  id: string;
}

interface QueryResponse {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: QueryData;
}

interface QueryData {
  character: QueryCharacter;
}

interface QueryCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterOrigin;
  location: CharacterLocation;
  image: string;
  created: string;
}

interface CharacterOrigin {
  name: string;
}

interface CharacterLocation {
  name: string;
}

export const GET_CHARACTER_QUERY = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      created
    }
  }
`;

export default function Character({ id }: CharacterProps) {
  const queryResponse: QueryResponse = useQuery(GET_CHARACTER_QUERY, {
    variables: { id },
  });

  const { loading, error, data } = queryResponse;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No results</p>;

  return (
    <div>
      <h3>
        {data.character.id} - {data.character.name}
      </h3>
      <img width="300" height="300" alt="" src={`${data.character.image}`} />
      <p>
        <b>ID:</b> {data.character.id}
      </p>
      <p>
        <b>Name:</b> {data.character.name}
      </p>
      <p>
        <b>Status:</b> {data.character.status}
      </p>
      <p>
        <b>Species:</b> {data.character.species}
      </p>
      <p>
        <b>Type:</b> {data.character.type}
      </p>
      <p>
        <b>Gender:</b> {data.character.gender}
      </p>
      <p>
        <b>Origin:</b> {data.character.origin.name}
      </p>
      <p>
        <b>Location:</b> {data.character.location.name}
      </p>
      <p>
        <b>Created:</b> {new Date(data.character.created).toLocaleString()}
      </p>
    </div>
  );
}
