import { JSX } from 'react';
import StartPage from './pages/StartPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';

interface Route {
  element: JSX.Element;
  path: string;
  menuLabel: string;
}


const routes: Route[] = [
  { element: <StartPage />, path: '/', menuLabel: 'Start' },
  { element: <AboutPage />, path: '/about-us', menuLabel: 'About us' },
  { element: <ProductsPage />, path: '/products', menuLabel: 'Our products' }
];

export default routes;