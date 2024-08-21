import { ArrowLeft, Bookmark, Search } from "lucide-react";
import { Button, Title } from "../components";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 mx-auto h-16 w-[95%] rounded-bl-3xl rounded-br-3xl bg-secondary shadow-xl md:w-4/5">
      <div
        className={`flex h-full items-center justify-between px-8 ${showSearchBar && "hidden"}`}
      >
        <Title />
        <div className="flex items-center gap-4 md:gap-6">
          <SearchBar className="hidden md:flex" />
          <Button
            variant="iconFill"
            className="p-2.5 md:hidden"
            onClick={() => setShowSearchBar(true)}
          >
            <Search size={20} />
          </Button>
          <Button
            variant="iconFill"
            className="p-2.5"
            onClick={() => navigate("/anime/bookmark")}
          >
            <Bookmark size={20} />
          </Button>
        </div>
      </div>
      {showSearchBar && (
        <div className="flex h-full w-[95%] flex-shrink-0 items-center justify-center gap-2">
          <Button
            variant="ghost"
            className="p-2.5"
            onClick={() => setShowSearchBar(false)}
          >
            <ArrowLeft size={25} />
          </Button>
          <SearchBar className="flex w-4/5" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
