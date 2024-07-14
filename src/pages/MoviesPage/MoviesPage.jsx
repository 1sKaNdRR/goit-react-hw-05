import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import css from "./MoviesPage.module.css";

const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGMyNmNhYTRkNzBjZWIzMjAyODhmYjFkNTQ2NTdiYiIsIm5iZiI6MTcyMDcxNTgwNi4zNzUxODMsInN1YiI6IjY2OGZmMWY0YWI5ZjZhYWY5YjkxM2IzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KIhzSwEv9c2gz8AxBsUy5VLCwN5ztKLWBSp4FGZ84oI';

export default function MoviesPage () {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitRef = useRef();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSearchParams({ query });
    await searchMovies(query);
    setIsSubmitting(false);
  }, [query, setSearchParams, isSubmitting]);

  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      setQuery(queryParam);
      searchMovies(queryParam);
    }
  }, [searchParams]);

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setError('Please enter a movie to search!');
      return;
    }

    setError(null);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        headers: {
          Authorization: API_TOKEN,
        },
        params: {
          query,
        },
      });

      if (response.data.results.length === 0) {
        setError('No results found for your search!');
      } else {
        setMovies(response.data.results);
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={css.textArea}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          disabled={isSubmitting}
        />
        <button type="submit" className={css.button} disabled={isSubmitting}>
          {isSubmitting ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className={css.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}

