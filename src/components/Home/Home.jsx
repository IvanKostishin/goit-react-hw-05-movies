import { useState, useEffect } from 'react';
import { fetchPopularMovie } from '../../services/api-fetches';
import { Link, useLocation } from 'react-router-dom';
import css from 'components/Home/Home.module.css';
import { Loader } from 'components/Loader/Loader';

const Home = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [popularMovie, setPopularMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const {
        data: { results },
      } = await fetchPopularMovie();
      setPopularMovie(results);
      setLoading(false);
    }

    fetchData();
  }, []);
  return (
    <div className={css.container}>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <h1 className={css.title}>Trending today</h1>
          <ul className={css.moviesList}>
            {popularMovie.map(({ original_title, id, poster_path, title }) => (
              <li key={id} className={css.movieItem}>
                <Link to={`/Movies/${id}`} state={{ from: location }}>
                  {poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                      alt={title}
                      width={250}
                      className={css.movieImage}
                    />
                  ) : (
                    <img
                      src={
                        'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
                      }
                      alt={title}
                      width={250}
                      className={css.noImage}
                    />
                  )}
                  <p className={css.movieTitle}>{original_title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
