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
