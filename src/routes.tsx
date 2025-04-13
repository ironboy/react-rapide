// pages/routes
import StartPage from './pages/StartPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import { ReactElement } from 'react';

interface RouteWithMenuLabel {
  path: string,
  element: ReactElement,
  menuLabel?: string;
}

const routes: RouteWithMenuLabel[] = [
  { element: <StartPage />, path: '/', menuLabel: 'Start' },
  { element: <AboutPage />, path: '/about-us', menuLabel: 'About us' },
  { element: <ProductsPage />, path: '/products', menuLabel: 'Our products' }
];

export default routes;