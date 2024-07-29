import { Hero, Navbar } from "../layouts";
import Footer from "../layouts/Footer";

const HomePage = () => {
  return (
    <div className="h-screen w-full bg-black">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default HomePage;
