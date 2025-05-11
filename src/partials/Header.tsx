import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
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

  return <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand className="me-4" as={Link} to="/">
        The Good Grocery
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {routes.filter(x => x.menuLabel).map(
            ({ menuLabel, path }, i) =>
              <Nav.Link as={Link}
                className={isActive(path) ? 'active' : ''}
                key={i}
                to={path}
              >{menuLabel}</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>;
}