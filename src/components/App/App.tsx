import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import { MovieModal } from '../MovieModal/MovieModal';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  // Стан для модалки тепер всередині компонента
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      
      const results = await fetchMovies(query);

      if (results === null) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(results);
    } catch (error) {
      setIsError(true);
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
    
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      
      {!isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={handleOpenModal} />
      )}

      {/* Рендеримо модалку, якщо вибрано фільм */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;