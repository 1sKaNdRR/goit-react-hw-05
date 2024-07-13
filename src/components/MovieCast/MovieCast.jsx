import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGMyNmNhYTRkNzBjZWIzMjAyODhmYjFkNTQ2NTdiYiIsIm5iZiI6MTcyMDcxNTgwNi4zNzUxODMsInN1YiI6IjY2OGZmMWY0YWI5ZjZhYWY5YjkxM2IzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KIhzSwEv9c2gz8AxBsUy5VLCwN5ztKLWBSp4FGZ84oI';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: API_TOKEN,
        },
      });
      setCast(response.data.cast);
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(member => (
          <li key={member.cast_id}>
            <img src={`${IMAGE_BASE_URL}${member.profile_path}`} alt={member.name}
              height={250}
              width={150}
            />
            <p>{member.name} as {member.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

