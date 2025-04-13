// pages/routes
import StartPage from './pages/StartPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';

export default [
  StartPage,
  AboutPage,
  ProductsPage
].map(x => x.route);