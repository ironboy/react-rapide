import { Link, useLocation } from 'react-router-dom';
import routes from '../routes';

export default function Header() {

  //  get the current route
  const pathName = useLocation().pathname;
  const currentRoute = routes
    .slice().sort((a, b) => a.path.length > b.path.length ? -1 : 1)
    .find(x => pathName.indexOf(x.path.split(':')[0]) === 0);
  // function that returns true if a menu item is 'active'
  const isActive = (path: string) =>
    path === currentRoute?.path || path === currentRoute?.parent;

  return <header>
    <Link to="/">
      <h1>The Good Grocery</h1>
    </Link>
    <nav>
      {routes.filter(x => x.menuLabel).map(({ menuLabel, path }, i) =>
        <Link
          className={isActive(path) ? 'active' : ''}
          key={i}
          to={path}
        >{menuLabel}</Link>)}
    </nav>
  </header>;
}