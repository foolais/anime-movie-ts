import { addBookmarkAnime, truncateText } from "../utils/utils";
import Button from "./Button";
import { Bookmark, Info } from "lucide-react";
import { Movies } from "../types/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PosterProps {
  data: Movies;
}

const Poster = ({ data }: PosterProps) => {
  const { mal_id, title, episodes, synopsis, images } = data;
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const handleClickBookmark = useCallback(() => {
    addBookmarkAnime(data, isBookmarked ? "remove" : "add");
    setIsBookmarked((prev) => !prev);
  }, [data, isBookmarked]);

  useEffect(() => {
    const bookmarked = JSON.parse(
      localStorage.getItem("bookmarkMovie") || "[]",
    );
    setIsBookmarked(bookmarked.some((item: Movies) => item.mal_id === mal_id));
  }, []);

  const synopsisText = useMemo(
    () => truncateText(synopsis || "", 80),
    [synopsis],
  );

  return (
    <div className="w-[180px] cursor-pointer transition-all duration-300 ease-in-out md:w-[200px]">
      <div className="group relative">
        <div>
          <img
            src={images?.jpg?.large_image_url}
            alt={title}
            className="h-[300px] min-w-[150px] object-cover"
          />
          <p className="w-[150px] text-center text-white">{title}</p>
        </div>
        <div className="absolute bottom-0 top-0 hidden w-[180px] bg-secondary bg-opacity-95 group-hover:flex md:w-[200px]">
          <div className="relative flex h-full w-full flex-col justify-start gap-4 text-wrap p-8 font-bold text-white">
            <p className="text-md">{title}</p>
            {episodes && (
              <p className="text-sm font-extrabold text-gray-500">
                {episodes} Episodes
              </p>
            )}
            {synopsis && <p className="text-sm">{synopsisText}</p>}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-2">
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => navigate(`/details/${mal_id}`)}
              >
                <Info size={30} />
              </Button>
              <Button
                variant="ghost"
                className="p-2"
                onClick={handleClickBookmark}
              >
                <Bookmark size={30} fill={isBookmarked ? "#7ECA9C" : "none"} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
