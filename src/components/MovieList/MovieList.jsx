import { Link, useLocation } from 'react-router-dom';
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.container}>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link 
            to={`/movies/${movie.id}`} 
            state={{ from: location.pathname + location.search }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

