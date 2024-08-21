import { ChevronRight } from "lucide-react";
import { Button, Poster, PosterSkeleton, SliderContainer } from "../components";
import useQueries from "../hooks/useQueries";
import { PosterAnimes } from "../types/types";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  url: string;
}

const PosterSlider = (props: Props) => {
  const { title, url } = props;

  const navigate = useNavigate();

  const { data, isLoading } = useQueries({
    prefixUrl: url,
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

  const settings = {
    infinite: true,
    autoPlay: true,
    speedAutoPlay: 1000,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleNavigateList = () => {
    const path = title?.toLocaleLowerCase()?.split(" ");
    if (path) navigate(`/anime/${path[0]}?page=1`);
  };

  return (
    <div className="bg-black px-8 py-4">
      <div className="flex w-full justify-between">
        <h3 className="mb-4 text-2xl font-semibold tracking-wider text-white">
          {title}
        </h3>
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-white hover:text-primary"
          onClick={handleNavigateList}
        >
          <span className="text-lg font-semibold">See More</span>
          <ChevronRight size={25} />
        </Button>
      </div>
      <SliderContainer {...settings} className="custom-slick">
        {data && !isLoading
          ? data.map((movie) => <Poster data={movie} key={movie?.mal_id} />)
          : Array.from({ length: 10 }).map((_, index) => (
              <PosterSkeleton key={index} />
            ))}
      </SliderContainer>
    </div>
  );
};

export default PosterSlider;
