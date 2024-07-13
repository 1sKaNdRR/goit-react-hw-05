import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, NavLink, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import css from "./MovieDetailsPage.module.css";

const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGMyNmNhYTRkNzBjZWIzMjAyODhmYjFkNTQ2NTdiYiIsIm5iZiI6MTcyMDcxNTgwNi4zNzUxODMsInN1YiI6IjY2OGZmMWY0YWI5ZjZhYWY5YjkxM2IzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KIhzSwEv9c2gz8AxBsUy5VLCwN5ztKLWBSp4FGZ84oI';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPage, setPreviousPage] = useState('/movies');

  useEffect(() => {
    if (location.state?.from) {
      setPreviousPage(location.state.from);
    }

    const fetchMovieDetails = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          Authorization: API_TOKEN,
        },
      });
      setMovie(response.data);
    };

    fetchMovieDetails();
  }, [movieId, location.state?.from]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(previousPage)} className={css.button}>Go back</button>
      <div className={css.container}>
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} height={500} />
        <ul className={css.listWrap}>
          <li><h1>{movie.title}</h1></li>
          <li><p>{movie.overview}</p></li>
          <li><p>{movie.tagline}</p></li>
          <li><p>{movie.status}</p></li>
        </ul>
      </div>
      
      <nav className={css.containerNav}>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
}
