// pages/routes
import AboutPage from './pages/AboutPage.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import StartPage from './pages/StartPage.tsx';

export default [
  AboutPage,
  ProductsPage,
  StartPage
].map(x => x.route).sort((a, b) => (a.index || 0) - (b.index || 0));