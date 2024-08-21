import Swal from "sweetalert2";
import { Movies } from "../types/types";

export const truncateText = (text: string, length: number) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }
};

export const mappedGenres = (genres: any) => {
  if (genres) {
    return genres.map((genre: any) => genre.name).join(", ");
  }
};

export const addBookmarkAnime = (data: Movies, type: "add" | "remove") => {
  const bookmarkKey = "bookmarkMovie";
  const bookmarks = JSON.parse(
    localStorage.getItem(bookmarkKey) || "[]",
  ) as Movies[];

  if (bookmarks && bookmarks.length === 20) {
    warningDialog("You can only add 20 anime to bookmark");
    return;
  }

  if (type === "remove") {
    const newBookmarks = bookmarks.filter(
      (item) => item.mal_id !== data.mal_id,
    );
    localStorage.setItem(bookmarkKey, JSON.stringify(newBookmarks));
    return;
  }

  if (bookmarks.some((item) => item.mal_id === data.mal_id)) return;

  bookmarks.push(data);
  localStorage.setItem(bookmarkKey, JSON.stringify(bookmarks));
};

export const warningDialog = (text: string) => {
  Swal.fire({
    icon: "warning",
    title: "Warning",
    text,
  });
};
