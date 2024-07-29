import { Hero, Navbar } from "../layouts";

const HomePage = () => {
  return (
    <div className="h-screen w-full bg-black">
      <Navbar />
      <Hero />
      <p className="py-52">Hello</p>
    </div>
  );
};

export default HomePage;
