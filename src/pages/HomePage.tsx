import { Footer, Hero, Navbar, PosterSlider } from "../layouts";

const HomePage = () => {
  return (
    <div className="h-screen w-full bg-black">
      <Navbar />
      <Hero />
      <PosterSlider title="Top Anime" url="/top/anime" />
      <PosterSlider title="Upcoming Season" url="/seasons/upcoming" />
      <Footer />
    </div>
  );
};

export default HomePage;
