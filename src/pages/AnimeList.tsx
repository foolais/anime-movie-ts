import { useSearchParams } from "react-router-dom";
import { Footer, Navbar } from "../layouts";
import ListContainer from "../layouts/ListContainer";
import { useEffect } from "react";
import { AnimeListParams } from "../types/types";

interface Props {
  title: AnimeListParams;
}

const AnimeList = (props: Props) => {
  const { title } = props;
  const [searchParams] = useSearchParams();

  const setTitle = () => {
    if (title === "search") {
      const search = searchParams.get("q");
      if (!search) return "Search Anime";
      return `Search Anime "${search}"`;
    } else {
      return `${title} Anime`;
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="h-full min-h-screen w-full bg-black p-4">
      <Navbar />
      {title && (
        <div className="mx-auto w-[95vw]">
          <h1 className="mb-4 mt-20 text-3xl font-bold capitalize tracking-wider text-white">
            {setTitle()}
          </h1>
          <ListContainer title={title} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AnimeList;
