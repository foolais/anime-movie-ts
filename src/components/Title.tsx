import { Film } from "lucide-react";

const Title = () => {
  return (
    <div className="flex items-center text-primary">
      <Film strokeWidth={2} />
      <span className="tracking-widest font-bold">FXMovies</span>
    </div>
  );
};

export default Title;
