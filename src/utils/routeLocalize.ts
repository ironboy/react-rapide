import type { LangRoute } from '../interfaces/Route';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams }
  from 'react-router-dom';
import rawRoutes from '../routes';

export const supportedLangs = ['en', 'sv', 'no'];
let lang = 'en';

export function currentLang() {
  let lang = location.pathname.slice(1, 3);
  if (!supportedLangs.includes(lang)) { lang = 'en'; }
  return lang;
}

// expand routes so that the have a path with :lang param
// and a property langPath -> the route with current lang
export const routes: LangRoute[] = rawRoutes.map(route => {
  let path = route.path;
  path === '*' && (path = '/*');
  path = '/:lang' + path;
  return {
    ...route,
    path,
    // a getter for the correct path including language
    get langPath() {
      return path.replace(':lang/', currentLang() + '/');
    }
  };
});

export function useLangRedirect() {
  let location = useLocation();
  let navigate = useNavigate();
  let langParam = useParams().lang as string;

  useEffect(() => {
    lang = supportedLangs.includes(langParam) ? langParam : lang;
    // if the language doesn't match the url lang param, redirect
    if (lang !== langParam) {
      let loc = location.pathname;
      // if there is a lang param in the location, remove it
      if (loc.match(/^[a-z]{2}\//)) { loc = loc.slice(3); }
      // calculate the correct redirect and perform it
      let to = '/' + lang + loc;
      if (to.endsWith('/')) { to = to.slice(0, -1); }
      navigate(to, { replace: true });
    }
  }, [langParam]);
}