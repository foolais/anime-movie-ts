import { Bookmark, Play, Star } from "lucide-react";
import useQueries from "../hooks/useQueries";
import { mappedGenres, truncateText } from "../utils/utils";
import { Button } from "../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderContainer from "../components/Slider/SliderContainer";

interface Genres {
  mal_id: number;
  name: string;
}

interface Images {
  image_url: string;
  large_image_url: string;
  small_image_url: string;
}

interface Trailer extends Images {
  medium_image_url: string;
  maximum_image_url: string;
}

interface Movies {
  mal_id: number;
  title: string;
  genres: Genres;
  score: number;
  synopsis: string;
  images: { jpg: Images };
  trailer: { images: Trailer };
}

const Hero = () => {
  const { data, isLoading } = useQueries({
    prefixUrl: "/seasons/now?limit=8",
    transformData: (data: Movies[]) => {
      const transformedData = data.map((movie) => ({
        mal_id: movie.mal_id,
        title: movie.title,
        genres: movie.genres,
        score: movie.score,
        synopsis: movie.synopsis,
        images: movie.images?.jpg,
        trailer: movie.trailer?.images,
      }));

      return transformedData;
    },
  });

  const settings = {
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    adaptiveHeight: true,
  };
  if (isLoading)
    return (
      <div className="mt-10 flex h-screen w-full text-4xl">
        <p className="mx-auto text-white">Loading...</p>
      </div>
    );

  return (
    <SliderContainer {...settings} className="max-h-screen overflow-hidden">
      {!isLoading &&
        data?.map((movie) => (
          <div
            key={movie.mal_id}
            className="relative h-full w-full overflow-x-hidden"
          >
            <div className="relative flex aspect-square h-screen w-full justify-end">
              {/* Backdrop Image */}
              <img
                src={movie?.trailer?.maximum_image_url}
                alt={movie?.title}
                className="h-[90vh] w-full bg-no-repeat object-cover object-center md:h-[80vh] lg:h-screen lg:w-[80%] lg:object-left"
              />
              {/* Gradient */}
              <div className="hero-gradient-overlay" />
              {/* Information Movie */}
              <div className="absolute left-1/2 top-[65%] z-40 w-3/4 -translate-x-1/2 -translate-y-1/2 md:left-[25%] md:top-[60vh] lg:left-96 lg:top-[40vh] lg:translate-y-0">
                <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
                  {/* Poster Image */}
                  <img
                    src={movie?.images?.large_image_url}
                    alt={movie?.title}
                    className="w-[170px] rounded-lg md:w-[200px] lg:w-[230px]"
                  />
                  {/* Information Right side */}
                  <div className="flex max-w-[500px] flex-col items-center justify-center gap-4 text-white md:max-w-[400px] lg:items-start">
                    {/* Title */}
                    <h2 className="max-w-[300px] text-center text-lg font-bold tracking-wider lg:text-left lg:text-2xl">
                      {movie?.title}
                    </h2>
                    {/* Star */}
                    <div className="hidden items-center gap-2 lg:flex">
                      <Star fill="yellow" size={25} />
                      <span className="text-xl font-semibold">
                        {movie?.score}
                      </span>
                    </div>
                    {/* Synopsis */}
                    <p className="hidden lg:block lg:max-w-[300px]">
                      {truncateText(movie?.synopsis, 150)}
                    </p>
                    {/* Genres */}
                    <p className="hidden lg:block">
                      Genres: {mappedGenres(movie?.genres)}
                    </p>
                    {/* CTA Button */}
                    <div className="flex items-center gap-6">
                      <Button className="flex flex-shrink-0 items-center gap-2 px-6 py-2 lg:text-xl">
                        <Play size={25} strokeWidth={2} />
                        <p>See Details</p>
                      </Button>
                      <Button variant="outline" className="px-2 py-2">
                        <Bookmark size={25} strokeWidth={2} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </SliderContainer>
  );
};

export default Hero;
