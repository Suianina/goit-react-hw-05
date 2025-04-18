import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get('query') || '';

  useEffect(() => {
    let isMounted = true;

    const getMovies = async () => {
      if (!query) {
        if (isMounted) {
          setMovies([]);
          setLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        const data = await fetchMoviesByQuery(query);

        if (isMounted) {
          setMovies(data.results || []);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
          setMovies([]);
          setLoading(false);
        }
      }
    };

    getMovies();

    return () => {
      isMounted = false;
    };
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if (searchQuery === '') {
      setSearchParams({});
      return;
    }

    setSearchParams({ query: searchQuery });
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : query ? (
        <p className={styles.noResults}>
          No movies found for &ldquo;{query}&rdquo;
        </p>
      ) : null}
    </div>
  );
};

export default MoviesPage;
