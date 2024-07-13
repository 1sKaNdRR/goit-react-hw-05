import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGMyNmNhYTRkNzBjZWIzMjAyODhmYjFkNTQ2NTdiYiIsIm5iZiI6MTcyMDcxNTgwNi4zNzUxODMsInN1YiI6IjY2OGZmMWY0YWI5ZjZhYWY5YjkxM2IzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KIhzSwEv9c2gz8AxBsUy5VLCwN5ztKLWBSp4FGZ84oI';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        headers: {
          Authorization: API_TOKEN,
        },
      });
      setMovies(response.data.results);
    };
    fetchPopularMovies();
  }, []);


  return (
    <div>
      <h1>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
}





