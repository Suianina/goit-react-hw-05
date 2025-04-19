import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (cast.length === 0)
    return <div className={styles.noCast}>No cast information available</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cast</h2>
      <ul className={styles.list}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.item}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : 'https://placehold.co/200x300/112240/ffffff?text=No+Photo'
              }
              alt={actor.name}
              className={styles.photo}
            />
            <p className={styles.name}>{actor.name}</p>
            <p className={styles.character}>{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;