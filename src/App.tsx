import { useLocation } from 'react-router-dom';
import Header from "./partials/Header";
import Main from './partials/Main';
import Footer from './partials/Footer';
import BootstrapBreakpoints from './parts/BootstrapBreakpoints';
import useOnAnyRender from './utils/useOnAnyRender';
import { translate } from './utils/translator';

// import { useLayoutEffect } from 'react';
// import { translate } from './utils/translator';

// turn off when not needed for debugging
const showBootstrapBreakpoints = true;

export default function App() {

  useOnAnyRender(() => translate('no'));

  // scroll to top when the route changes
  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  return <>
    <Header />
    <Main />
    <Footer />
    {showBootstrapBreakpoints ? <BootstrapBreakpoints /> : null}
  </>;
};

