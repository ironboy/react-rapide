import { JSX, createElement } from 'react';
// page components
import AboutPage from './pages/AboutPage.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import StartPage from './pages/StartPage.tsx';

interface Route {
  element: JSX.Element;
  path: string;
  menuLabel: string;
  index?: number;
  parent?: JSX.Element
}

export default [
  AboutPage,
  ProductsPage,
  StartPage
]
  // map the route property of each page component to a Route
  .map(x => (({ element: createElement(x), ...x.route }) as Route))
  // sort by index (and if an item has no index, sort as index 0)
  .sort((a, b) => (a.index || 0) - (b.index || 0));