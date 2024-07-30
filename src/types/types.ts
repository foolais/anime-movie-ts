interface Genres {
  mal_id: number;
  name: string;
}

interface Images {
  image_url: string;
  large_image_url: string;
  small_image_url: string;
}

interface Trailer extends Images {
  medium_image_url: string;
  maximum_image_url: string;
}

export interface Movies {
  mal_id: number;
  title: string;
  genres: Genres;
  score: number;
  synopsis: string;
  images: { jpg: Images };
}

export interface BackdropMovies extends Movies {
  trailer: { images: Trailer };
}

export interface PosterAnimes extends Movies {
  episodes?: number | null;
  year: number;
}
