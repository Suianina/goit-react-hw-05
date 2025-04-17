import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={styles.list}>
      {movies.map(({ id, title }) => (
        <li key={id} className={styles.item}>
          <Link to={`/movies/${id}`} className={styles.link}>
            <h3 className={styles.title}>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
