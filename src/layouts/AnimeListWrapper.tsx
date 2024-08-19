import { useParams } from "react-router-dom";
import AnimeList from "../pages/AnimeList";

type AnimeListParams = "top" | "upcoming" | "search";

const AnimeListWrapper = () => {
  const { listAnime } = useParams<{ listAnime: string }>();

  const titles: Record<AnimeListParams, AnimeListParams> = {
    top: "top",
    upcoming: "upcoming",
    search: "search",
  };

  const title = titles[listAnime as AnimeListParams];

  if (title) return <AnimeList title={title} />;
  else return null;
};

export default AnimeListWrapper;
