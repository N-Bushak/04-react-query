import axios from "axios";
import type { Movie } from '../types/movie';

export interface MovieSearchResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const API_KEY = import.meta.env.VITE_API_KEY;

export default async function fetchMovies(
  searchQuery: string,
  page: number
): Promise<MovieSearchResponse> {
    const response = await axios.get<MovieSearchResponse>(
      'https://api.themoviedb.org/3/search/movie', 
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        }, 
        params: {
          query: searchQuery,
          page: page,
          api_key: API_KEY, 
        }
      }
    );
    
    return response.data;
  }
