import { Suspense, lazy } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import css from 'components/app.module.css';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
  color: white;
  &.active {
    color: blue;
  }
`;

const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const NotFound = lazy(() => import('./NotFound/NotFound'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <div className={css.container}>
      <header>
        <nav className={css.navigate}>
          <StyledLink to="/" end>
            Home
          </StyledLink>
          <StyledLink to="/Movies">Movies</StyledLink>
        </nav>
      </header>

      <Suspense>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/Movies/:movieid" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};
