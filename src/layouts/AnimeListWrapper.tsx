import { useParams } from "react-router-dom";
import { AnimeListParams } from "../types/types";
import { AnimeList } from "../pages";

const AnimeListWrapper = () => {
  const { listAnime } = useParams<{ listAnime: string }>();

  const titles: Record<AnimeListParams, AnimeListParams> = {
    top: "top",
    upcoming: "upcoming",
    search: "search",
    bookmark: "bookmark",
  };

  const title = titles[listAnime as AnimeListParams];

  if (title) return <AnimeList title={title} />;
  else return null;
};

export default AnimeListWrapper;
