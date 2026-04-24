import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useQuery, keepPreviousData } from '@tanstack/react-query'; 
import Pagination from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import { MovieModal } from '../MovieModal/MovieModal';

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['movies', query, page], 
    queryFn: () => fetchMovies(query, page),
    enabled: !!query, 
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
  if (data && data.results.length === 0) {
    toast.error("No movies found for your request.");
  }
}, [data]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1); 
  };

  const handleOpenModal = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
    
      {(isLoading || isFetching) && <Loader />}
      
    {isError && <ErrorMessage message="Something went wrong!" />}

      {data && data.total_pages > 1 && (
  <Pagination 
    totalPages={data.total_pages} 
    currentPage={page} 
    onPageChange={(nextPage) => setPage(nextPage)} 
  />
)}
      {data && (
        <>
        {data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={handleOpenModal} />
      )}
      
</>
)}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;