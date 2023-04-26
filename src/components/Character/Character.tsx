import { useQuery } from "@apollo/client";
import styles from "./Character.module.css";
import { graphql } from "../../gql";

interface CharacterProps {
  id: string | undefined;
}

export const GET_CHARACTER_QUERY = graphql(`
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
`);

export default function Character({ id }: CharacterProps) {
  if (!id) return <p>No results</p>;

  const { loading, error, data } = useQuery(GET_CHARACTER_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data?.character) return <p>No results</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{data.character?.name}</h1>
      <img width="300" height="300" alt="" src={`${data.character.image}`} />
      <p>
        <b>ID:</b> {data.character.id}
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
        <b>Origin:</b> {data.character.origin?.name}
      </p>
      <p>
        <b>Location:</b> {data.character.location?.name}
      </p>
      <p>
        <b>Created:</b>{" "}
        {data.character.created &&
          new Date(data.character.created).toLocaleString()}
      </p>
    </div>
  );
}
