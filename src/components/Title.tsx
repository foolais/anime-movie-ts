import { Film } from "lucide-react";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <Link to="/" className="flex items-center gap-1 text-primary">
      <Film strokeWidth={2} />
      <h1 className="text-lg font-bold md:text-xl md:tracking-widest">
        FXMovies
      </h1>
    </Link>
  );
};

export default Title;
