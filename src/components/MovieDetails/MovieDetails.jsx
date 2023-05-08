import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieById } from 'services/api-fetches';
import { Loader } from 'components/Loader/Loader';

import css from 'components/MovieDetails/MovieDetails.module.css';
const BackLink = lazy(() => import('../BackLink/BackLink'));

const MovieDetails = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movieid: movie_id } = useParams();

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const [movie, setMovie] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await fetchMovieById(movie_id);
      setMovie(data);
      setLoading(false);
      setGenres(data.genres);
    };

    fetchData();
    // eslint-disable-next-line
  }, [movie_id]);

  return (
    <div className={css.container}>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <BackLink to={backLinkHref}>Go Back</BackLink>
          <div className={css.movieContainer}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={350}
              />
            )}
            <div>
              <h2>{movie.original_title}</h2>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <div className={css.detailsLinks}>
            <Link to="Cast" state={{ from: backLinkHref }}>
              Cast
            </Link>
            <Link to="Reviews" state={{ from: backLinkHref }}>
              Reviews
            </Link>
          </div>
          <Suspense fallback={<Loader></Loader>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
