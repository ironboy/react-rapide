import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/index.css';
import routes from './routes.tsx';
import App from './App.tsx';

// Create a router using settings/content from 'routes.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes
  }
]);

// Create the React root element
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);