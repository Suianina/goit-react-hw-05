import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        console.log('API Response:', data);
        if (data.results) {
          setMovies(data.results);
        } else {
          throw new Error('No results found');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <div className={styles.noMovies}>No movies found</div>
      )}
    </div>
  );
};

export default HomePage; 