import { useEffect, useState } from "react";
import useQueries from "../hooks/useQueries";
import { PosterAnimes } from "../types/types";
import { Poster } from "../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

interface Props {
  title: "top" | "upcoming" | "search";
}

const ListContainer = ({ title }: Props) => {
  const [currentPage, setCurrentPage] = useState<any>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page") || "1";
    setCurrentPage(+page);
  }, [searchParams]);

  const getUrlPath = (): string => {
    switch (title) {
      case "top":
        return `/top/anime?page=${currentPage}`;
      case "upcoming":
        return `/seasons/upcoming?page=${currentPage}`;
      default:
        throw new Error("Invalid title prop for ListContainer");
    }
  };

  const { data, isLoading, pagination } = useQueries({
    prefixUrl: getUrlPath(),
    transformData: (data: PosterAnimes[]) =>
      data.map((movie) => ({
        mal_id: movie.mal_id,
        title: movie.title,
        genres: movie.genres,
        score: movie.score,
        synopsis: movie.synopsis,
        images: movie.images,
        episodes: movie?.episodes,
        year: movie?.year,
      })),
  });

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
    switch (title) {
      case "top":
        navigate(`/anime/top?page=${page}`);
        break;
      case "upcoming":
        navigate(`/anime/upcoming?page=${page}`);
        break;
      default:
        throw new Error("Invalid title prop for ListContainer");
    }
  };

  if (isLoading) {
    return (
      <div className="mt-10 flex h-screen w-full bg-black p-8 text-4xl">
        <p className="mx-auto text-white">Loading...</p>
      </div>
    );
  }

  const movies = data || [];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8">
        {movies.map((movie) => (
          <Poster data={movie} key={movie.mal_id} />
        ))}
      </div>
      {pagination?.last_visible_page && (
        <div className="flex w-full justify-center p-4">
          <Pagination
            currentPage={currentPage}
            lastPage={pagination.last_visible_page}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ListContainer;
