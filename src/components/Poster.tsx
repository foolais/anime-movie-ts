import { truncateText } from "../utils/utils";
import Button from "./Button";
import { Bookmark, Info } from "lucide-react";
import { Movies } from "../types/types";

interface PosterProps {
  data: Movies;
}

const Poster = ({ data }: PosterProps) => {
  const { mal_id, title, episodes, synopsis, images } = data;

  return (
    <div className="w-[200px] cursor-pointer transition-all duration-300 ease-in-out">
      <div className="group relative">
        <div>
          <img
            src={images?.jpg?.large_image_url}
            alt={title}
            className="h-[300px] min-w-[150px] object-cover"
          />
          <p className="w-[150px] text-center text-white">{title}</p>
        </div>
        <div className="absolute bottom-0 top-0 hidden w-[200px] bg-secondary bg-opacity-95 group-hover:flex">
          <div className="relative flex h-full w-full flex-col justify-start gap-4 text-wrap p-8 font-bold text-white">
            <p className="text-md">{title}</p>
            {episodes && (
              <p className="text-sm font-extrabold text-gray-500">
                {episodes} Episodes
              </p>
            )}
            {synopsis && (
              <p className="text-sm">{truncateText(synopsis, 80)}</p>
            )}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-2">
              <Button variant="ghost" className="p-2">
                <Info size={30} />
              </Button>
              <Button variant="ghost" className="p-2">
                <Bookmark size={30} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
