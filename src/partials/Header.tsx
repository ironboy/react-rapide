import { Link, NavLink } from 'react-router-dom';
import routes from '../routes';

export default function Header() {
  return <header>
    <Link to="/">
      <h1>Another Company</h1>
    </Link>
    <nav>
      {routes.filter(x => x.menuLabel).map(({ menuLabel, path }, i) =>
        <NavLink key={i} to={path}>{menuLabel}</NavLink>)}
    </nav>
  </header>;
}