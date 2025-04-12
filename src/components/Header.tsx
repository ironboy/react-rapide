import { NavLink } from 'react-router-dom';
import routes from '../routes.tsx';

export default function Header() {
  return <header>
    <h1>
      My Company
    </h1>
    <nav>
      {routes.map(({ menuLabel, path }, i) =>
        <NavLink key={i} to={path}>{menuLabel}</NavLink>)}
    </nav>
  </header>;
}