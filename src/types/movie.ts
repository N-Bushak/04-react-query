export interface Movie {
    id: number;
    poster_path: string | null;
    backdrop_path: string | null;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

export interface MovieSearchResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}