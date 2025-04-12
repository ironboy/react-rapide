// pages/routes
import StartPage from './pages/StartPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import { ReactElement } from 'react';

interface RouteWithMenuLabel {
  path: string,
  element: ReactElement,
  menuLabel: string;
}

const routes: RouteWithMenuLabel[] = [
  { path: '/', element: <StartPage />, menuLabel: 'Start' },
  { path: '/about-us', element: <AboutPage />, menuLabel: 'About us' },
  { path: '/products', element: <ProductsPage />, menuLabel: 'Our products' }
];

export default routes;