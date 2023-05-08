import css from 'components/BackLink/BackLink.module.css';

import { Link } from 'react-router-dom';

export const BackLink = ({ to, children }) => {
  return (
    <Link to={to} className={css.backLink}>
      {children}
    </Link>
  );
};

export default BackLink;
