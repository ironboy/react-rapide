import type { RouteObject } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider }
  from 'react-router-dom';
import '../sass/index.scss';
import { routes } from './utils/routeLocalize';
import { initializeTranslationEntries }
  from './utils/translator';
import App from './App';

// Create a router using settings/content from 'routes.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes as RouteObject[],
    HydrateFallback: App
  }
]);

// First load the translations then start React
let translations: any;
(async () => {
  // Read translations so they are ready before App start
  translations = await (await fetch('/translations.json')).json();
  initializeTranslationEntries(translations);

  // Create the React root element
  createRoot(document.querySelector('#root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
})();