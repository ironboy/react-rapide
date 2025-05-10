import { Link, NavLink } from 'react-router-dom';
import routes from '../routes.tsx';

export default function Header() {
  return <header>
    <Link to="/">
      <h1>The Good Grocery</h1>
    </Link>
    <nav>
      {routes.filter(x => x.menuLabel).map(({ menuLabel, path }, i) =>
        <NavLink key={i} to={path}>{menuLabel}</NavLink>)}
    </nav>
  </header>;
}