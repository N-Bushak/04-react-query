import axios from "axios";
import type { MovieSearchResponse } from "../types/movie";
import toast from "react-hot-toast";

export default async function fetchMovies(
  searchQuery: string,
  page: number
): Promise<MovieSearchResponse> {
  try {
    const response = await axios.get<MovieSearchResponse>(
      'https://api.themoviedb.org/3/search/movie', 
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        }, 
        params: {
          query: searchQuery,
          page: page, 
        }
      }
    );
    
    return response.data;
  } catch (error) {
    toast.error('Something went wrong');
    throw error;
  }
}