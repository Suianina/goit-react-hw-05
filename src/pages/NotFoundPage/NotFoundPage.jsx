import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Page not found</p>
      <Link to="/" className={styles.link}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
