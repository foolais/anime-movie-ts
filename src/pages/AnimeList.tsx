import { Footer, Navbar } from "../layouts";
import ListContainer from "../layouts/ListContainer";

interface Props {
  title?: string;
}

const AnimeList = (props: Props) => {
  const { title } = props;

  return (
    <div className="h-full min-h-screen w-full bg-black p-4">
      <Navbar />
      <div className="mx-auto w-[95vw]">
        <h1 className="mb-4 mt-20 text-3xl font-bold capitalize tracking-wider text-white">
          {title} Anime
        </h1>
        <ListContainer title={title} />
      </div>
      <Footer />
    </div>
  );
};

export default AnimeList;
