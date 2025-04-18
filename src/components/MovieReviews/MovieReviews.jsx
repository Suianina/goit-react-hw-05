import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (reviews.length === 0)
    return <div className={styles.noReviews}>No reviews yet</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>
      <ul className={styles.list}>
        {reviews.map(({ id, author, content }) => (
          <li key={id} className={styles.item}>
            <h3 className={styles.author}>{author}</h3>
            <p className={styles.content}>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
