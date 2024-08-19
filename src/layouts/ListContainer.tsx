import { useState } from "react";
import useQueries from "../hooks/useQueries";
import { PosterAnimes } from "../types/types";
import { Poster } from "../components";

interface Props {
  title?: string;
}

const ListContainer = ({ title }: Props) => {
  const [currentPages, setCurrentPages] = useState<number>(1);

  const getUrlPath = () => {
    if (title === "top") {
      return `/top/anime?page=${currentPages}`;
    } else if (title === "upcoming") {
      return `/seasons/upcoming?page=${currentPages}`;
    }
  };

  console.log(getUrlPath());

  const { data, isLoading } = useQueries({
    prefixUrl: getUrlPath(),
    transformData: (data: PosterAnimes[]) => {
      const transformedData = data.map((movie) => ({
        mal_id: movie.mal_id,
        title: movie.title,
        genres: movie.genres,
        score: movie.score,
        synopsis: movie.synopsis,
        images: movie.images,
        episodes: movie?.episodes,
        year: movie?.year,
      }));

      return transformedData;
    },
  });

  if (isLoading)
    return (
      <div className="mt-10 flex h-screen w-full bg-black p-8 text-4xl">
        <p className="mx-auto text-white">Loading...</p>
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8">
      {!isLoading &&
        data?.map((movie) => <Poster data={movie} key={movie.mal_id} />)}
    </div>
  );
};

export default ListContainer;
