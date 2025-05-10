// pages/routes
import AboutPage from './pages/AboutPage.tsx';
import ProductDetailsPage from './pages/ProductDetailsPage.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import StartPage from './pages/StartPage.tsx';

export default [
  AboutPage,
  ProductDetailsPage,
  ProductsPage,
  StartPage
]
  // get the routes for each component
  .map(x => x.route)
  // sort by index
  .sort((a: any, b: any) => (a.index || 0) - (b.index || 0));