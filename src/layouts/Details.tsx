import { useParams } from "react-router-dom";
import useQueries from "../hooks/useQueries";
import { AnimeDetails, Genres, Movies } from "../types/types";
import { Bookmark } from "lucide-react";
import { Button } from "../components";
import { useEffect, useState } from "react";
import { addBookmarkAnime } from "../utils/utils";

const Details = () => {
  const { mal_id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { data, isLoading } = useQueries({
    prefixUrl: `/anime/${mal_id}`,
    transformData: (data: AnimeDetails) => ({
      mal_id: data?.mal_id,
      title: data?.title,
      title_japanese: data?.title_japanese,
      genres: data?.genres,
      status: data?.status,
      rating: data?.rating,
      score: data?.score,
      episodes: data?.episodes,
      season: data?.season,
      year: data?.year,
      synopsis: data?.synopsis,
      images: data?.images?.jpg,
    }),
  });

  const details = [
    { label: "Japanese Title", value: data?.title_japanese },
    { label: "Status", value: data?.status },
    { label: "Rating", value: data?.rating },
    { label: "Score", value: data?.score },
    { label: "Episodes", value: data?.episodes },
    { label: "Seasons", value: data?.season },
    { label: "Year", value: data?.year },
  ];

  const handleClickBookmark = () => {
    const payload = {
      mal_id: data!.mal_id,
      title: data!.title,
      genres: data!.genres,
      score: data!.score,
      synopsis: data!.synopsis,
      images: { jpg: data!.images },
    };

    addBookmarkAnime(payload, isBookmarked ? "remove" : "add");

    setIsBookmarked((prev) => !prev);
  };

  useEffect(() => {
    const bookmarked = JSON.parse(
      localStorage.getItem("bookmarkMovie") || "[]",
    );

    if (bookmarked && mal_id)
      setIsBookmarked(
        bookmarked.some((item: Movies) => item.mal_id === +mal_id),
      );
  }, []);

  if (isLoading) {
    return (
      <div className="mt-10 flex h-screen w-full bg-black p-8 text-4xl">
        <p className="mx-auto text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-4 mt-20 w-full">
      <div className="mx-auto flex flex-col items-center gap-8 md:w-[95vw] lg:w-[85vw] lg:flex-row lg:items-start xl:w-[70vw] 2xl:w-[60vw]">
        <div className="text-white">
          <p className="text-center text-3xl font-bold lg:text-left">
            {data?.title}
          </p>
          <p className="mt-4 hidden text-justify tracking-wide lg:block lg:text-lg">
            {data?.synopsis}
          </p>
        </div>
        <img
          src={data?.images?.large_image_url}
          alt={data?.title}
          className="w-[300px] object-cover lg:order-first lg:w-[350px]"
        />
      </div>
      <Button
        variant="outline"
        className="group mx-auto my-8 flex w-max items-center justify-center gap-4 rounded-md px-4 py-2 hover:bg-primary md:w-2/5 xl:w-1/3 2xl:w-1/4"
        onClick={handleClickBookmark}
      >
        <p className="text-lg font-semibold tracking-widest text-primary group-hover:text-black lg:text-xl">
          {isBookmarked ? "Remove from Bookmark" : "Add to Bookmark"}
        </p>
        <Bookmark size={30} fill={isBookmarked ? "#7ECA9C" : "none"} />
      </Button>
      <div className="mx-auto w-[85vw] text-justify text-white md:w-[75vw] lg:w-[60vw] xl:w-[45vw]">
        <p className="text-center text-lg tracking-wide lg:hidden">
          {data?.synopsis}
        </p>
        <div className="my-4 flex items-center gap-3">
          {data?.genres?.map((genre: Genres) => (
            <div
              key={genre.mal_id}
              className="cursor-pointer rounded bg-primary px-2.5 py-1 hover:bg-opacity-70"
            >
              <p className="text-lg font-semibold text-black">{genre.name}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          {details.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between border-b-2 border-primary pb-1 text-lg"
            >
              <p className="font-semibold tracking-widest text-primary">
                {label}
              </p>
              <p className="text-right">{value || "Unknown"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
