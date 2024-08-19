import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  lastPage,
  handlePageChange,
}: PaginationProps) => {
  const handleClick = (page: number, type: string) => {
    if (type === "next") {
      handlePageChange(page + 1);
    } else if (type === "prev") {
      handlePageChange(page - 1);
    } else if (type === "first") {
      handlePageChange(1);
    } else if (type === "last") {
      handlePageChange(lastPage);
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        variant="iconFill"
        className="rounded-sm p-2"
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage, "first")}
      >
        <ChevronsLeft size={20} />
      </Button>
      <Button
        variant="iconFill"
        className="rounded-sm p-2"
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage, "prev")}
      >
        <ChevronLeft size={20} />
      </Button>
      <div className="flex items-center gap-2 text-xl font-semibold text-primary">
        <p>{currentPage}</p>
        <span>of</span>
        <p>{lastPage}</p>
      </div>
      <Button
        variant="iconFill"
        className="rounded-sm p-2"
        disabled={currentPage === lastPage}
        onClick={() => handleClick(currentPage, "next")}
      >
        <ChevronRight size={20} />
      </Button>
      <Button
        variant="iconFill"
        className="rounded-sm p-2"
        disabled={currentPage === lastPage}
        onClick={() => handleClick(currentPage, "last")}
      >
        <ChevronsRight size={20} />
      </Button>
    </div>
  );
};

export default Pagination;
