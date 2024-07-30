import { Film } from "lucide-react";

const Title = () => {
  return (
    <div className="flex items-center gap-1 text-primary">
      <Film strokeWidth={2} />
      <h1 className="text-lg font-bold md:text-xl md:tracking-widest">
        FXMovies
      </h1>
    </div>
  );
};

export default Title;
