import type Route from "../interfaces/Route";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams }
  from "react-router-dom";
import rawRoutes from '../routes';

export const routes: Route[] = rawRoutes.map(route => {
  route.pathNoLang = route.path;
  route.path === '*' && (route.path = '/*');
  route.path = '/:lang' + route.path;
  return route;
});

let lang = 'en';

export function useLangRedirect() {
  let location = useLocation();
  let navigate = useNavigate();
  let langParam = useParams().lang as string;

  useEffect(() => {
    lang = ['en', 'sv', 'no'].includes(langParam) ? langParam : lang;
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