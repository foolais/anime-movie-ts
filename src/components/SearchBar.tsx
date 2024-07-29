import { Search } from "lucide-react";
import Button from "./Button";
import { FormEvent, useState } from "react";

const SearchBar = ({ className }: { className?: string }) => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    console.log({ search });
  };

  return (
    <form
      className={`flex-shrink-0 items-center ${className}`}
      onSubmit={handleSearch}
    >
      <input
        type="search"
        name="search"
        placeholder="Search Anime Here..."
        className="input input-bordered w-full rounded-l-full px-4 py-2 lg:w-[400px] xl:w-[500px]"
        onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button className="flex h-10 w-14 items-center justify-center rounded-l-none rounded-r-full">
        <Search size={20} />
      </Button>
    </form>
  );
};

export default SearchBar;
