import { useParams } from "react-router-dom";
import { Character } from "../components/Character/Character";

export default function Details() {
    const { characterId } = useParams();

    return <Character id={characterId} />;
}
