import { JSX } from 'react';
// pages/routes
import OurVisionPage from './pages/AboutPage.tsx';
import StartPage from './pages/OurVisionPage.tsx';
import ProductDetailsPage from './pages/ProductDetailsPage.tsx';
import ProductsPage from './pages/ProductsPage.tsx';

interface Route {
  element: JSX.Element;
  path: string;
  menuLabel: string;
  index?: number;
}

export default [
  OurVisionPage,
  StartPage,
  ProductDetailsPage,
  ProductsPage
]
  // get the routes for each component
  .map(x => x.route as Route)
  // sort by index (if an item has no index, sort as index 0)
  .sort((a, b) => (a.index || 0) - (b.index || 0));