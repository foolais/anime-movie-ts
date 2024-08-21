import { useCallback, useEffect, useState } from "react";
import useQueries from "../hooks/useQueries";
import { AnimeListParams, Movies, PosterAnimes } from "../types/types";
import { Pagination, Poster, PosterSkeleton } from "../components";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  title: AnimeListParams;
}

const ListContainer = ({ title }: Props) => {
  const [currentPage, setCurrentPage] = useState<any>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page") || "1";
    setCurrentPage(+page);
  }, [searchParams]);

  const getUrlPath = useCallback((): string => {
    switch (title) {
      case "top":
        return `/top/anime?page=${currentPage}`;
      case "upcoming":
        return `/seasons/upcoming?page=${currentPage}`;
      case "search":
        return `/anime?q=${searchParams.get("q")}&page=${currentPage}`;
      case "bookmark":
        return "";
      default:
        throw new Error("404 Page Not Found");
    }
  }, [title, currentPage, searchParams]);

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
      case "search":
        navigate(`/anime/search?q=${searchParams.get("q")}&page=${page}`);
        break;
      default:
        throw new Error("Invalid title prop for ListContainer");
    }
  };

  const getMoviesData = () => {
    if (title === "bookmark") {
      return JSON.parse(localStorage.getItem("bookmarkMovie") || "[]");
    }

    return data || [];
  };

  if (title === "bookmark" && getMoviesData().length === 0) {
    return (
      <div className="mt-10 flex h-[60vh] w-full bg-black p-4">
        <p className="mx-auto text-2xl font-semibold text-white">
          Empty Bookmarks Anime
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {!isLoading && title !== "bookmark"
          ? getMoviesData().map((movie: Movies) => (
              <Poster data={movie} key={movie.mal_id} />
            ))
          : title === "bookmark"
            ? getMoviesData().map((movie: Movies) => (
                <Poster data={movie} key={movie.mal_id} />
              ))
            : Array.from({ length: 20 }).map((_, index) => (
                <PosterSkeleton key={index} />
              ))}
      </div>
      {pagination?.last_visible_page && title !== "bookmark" && (
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
