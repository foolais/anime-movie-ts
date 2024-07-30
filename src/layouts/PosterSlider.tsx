import { Bookmark, Info, Play } from "lucide-react";
import { Button, SliderContainer } from "../components";
import useQueries from "../hooks/useQueries";
import { PosterAnimes } from "../types/types";
import { truncateText } from "../utils/utils";

interface Props {
  title?: string;
  url: string;
}

const PosterSlider = (props: Props) => {
  const { title, url } = props;

  const { data, isLoading } = useQueries({
    prefixUrl: url,
    transformData: (data: PosterAnimes[]) => {
      const transformedData = data.map((movie) => ({
        mal_id: movie.mal_id,
        title: movie.title,
        genres: movie.genres,
        score: movie.score,
        synopsis: movie.synopsis,
        images: movie.images?.jpg,
        episodes: movie?.episodes,
        year: movie?.year,
      }));

      return transformedData;
    },
  });

  const settings = {
    infinite: false,
    autoPlay: true,
    speedAutoPlay: 1000,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    variableWidth: true,
  };

  if (isLoading)
    return (
      <div className="mt-10 flex h-[30vh] w-full bg-black p-8 text-4xl">
        <p className="mx-auto text-white">Loading...</p>
      </div>
    );

  return (
    <div className="bg-black p-8">
      <h3 className="mb-4 text-2xl font-semibold tracking-wider text-white">
        {title}
      </h3>
      <SliderContainer {...settings} className="custom-slick">
        {data &&
          data.map((movie) => (
            <div
              key={movie?.mal_id}
              className="cursor-pointer transition-all duration-300 ease-in-out"
            >
              <div className="group relative">
                <div>
                  <img
                    src={movie?.images?.large_image_url}
                    alt={movie?.title}
                    className="h-[300px] w-[200px] object-cover"
                  />
                  <p className="max-w-[180px] text-center text-white">
                    {movie?.title}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 top-0 hidden bg-secondary bg-opacity-95 group-hover:flex">
                  <div className="relative flex h-full w-full flex-col justify-start gap-4 text-wrap p-8 font-bold text-white">
                    <p className="text-md">{movie?.title}</p>
                    {movie?.episodes && (
                      <p className="text-sm font-extrabold text-gray-500">
                        {movie?.episodes} Episodes
                      </p>
                    )}
                    {movie?.synopsis && (
                      <p className="text-sm">
                        {truncateText(movie?.synopsis, 80)}
                      </p>
                    )}
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-2">
                      <Button variant="ghost" className="p-2">
                        <Play />
                      </Button>
                      <Button variant="ghost" className="p-2">
                        <Bookmark size={30} />
                      </Button>
                      <Button variant="ghost" className="p-2">
                        <Info size={30} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </SliderContainer>
    </div>
  );
};

export default PosterSlider;
