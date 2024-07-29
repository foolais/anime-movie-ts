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

  console.log({ data });

  const settings = {
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 2500,
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
            <div className="relative flex aspect-square w-full justify-end">
              <img
                src={movie?.trailer?.maximum_image_url}
                alt={movie?.title}
                className="h-screen w-[80%] bg-no-repeat object-cover object-left-top"
              />
              {/* Gradient */}
              <div className="hero-gradient-overlay" />
              {/* Information Movie */}
              <div className="absolute left-20 top-[18%] z-40">
                <div className="flex gap-8">
                  <img
                    src={movie?.images?.large_image_url}
                    alt={movie?.title}
                    className="w-[320px] rounded-lg"
                  />
                  <div className="flex max-w-[400px] flex-col justify-center gap-4 text-white">
                    <h2 className="text-2xl font-bold tracking-wider">
                      {movie?.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Star fill="yellow" size={25} />
                      <span className="text-xl font-semibold">
                        {movie?.score}
                      </span>
                    </div>
                    <p>{truncateText(movie?.synopsis, 200)}</p>
                    <p>Genres: {mappedGenres(movie?.genres)}</p>
                    <div className="flex items-center gap-6">
                      <Button
                        className="flex items-center gap-2 px-6 py-2 text-xl"
                        variant="outline"
                      >
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
