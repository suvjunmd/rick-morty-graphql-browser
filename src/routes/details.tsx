import { useParams } from "react-router-dom";
import Character from "../components/Character";

export default function Details() {
  const { characterId } = useParams();

  return <Character id={characterId as string} />;
}
