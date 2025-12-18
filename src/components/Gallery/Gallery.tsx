import { Link } from "react-router-dom";
import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Pagination } from "../Pagination/Pagination";
import type { FilterConfig } from "../../utils";
import styles from "./Gallery.module.css";
import type {
    GetCharactersQuery,
    GetCharactersQueryVariables,
} from "../../types/__generated__/graphql";
// import { graphql } from "../../gql";

interface GalleryProps {
    filterConfig: FilterConfig;
    page: number;
    onNavigateToPage: (page: number) => void;
}

export const GET_CHARACTERS_QUERY: TypedDocumentNode<
    GetCharactersQuery,
    GetCharactersQueryVariables
> = gql(`
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
`);

export function Gallery({
    filterConfig,
    page,
    onNavigateToPage,
}: GalleryProps) {
    const { loading, error, data } = useQuery(GET_CHARACTERS_QUERY, {
        variables: { page, filter: filterConfig },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (!data?.characters) return <p>No results</p>;

    return (
        <>
            <div className={styles.container}>
                {data.characters.results?.map((character) => (
                    <div
                        className={`${styles.card} ${
                            character?.status === "Alive"
                                ? styles.statusAlive
                                : ""
                        }${character?.status === "Dead" ? styles.statusDead : ""}${
                            character?.status === "unknown"
                                ? styles.statusUnknown
                                : ""
                        }`}
                        key={character?.id}
                    >
                        <p>
                            <Link
                                to={`/characters/${character?.id}`}
                                className={styles.link}
                            >
                                {character?.id} - {character?.name}
                            </Link>
                        </p>
                        <img
                            width="200"
                            height="200"
                            alt=""
                            src={character?.image ?? undefined}
                            className={styles.image}
                        />
                    </div>
                ))}
            </div>
            <Pagination
                page={page}
                totalPages={data.characters.info?.pages ?? 1}
                onNavigateToPage={onNavigateToPage}
            />
        </>
    );
}
