import { useNavigate } from 'react-router-dom';
import { useLangRedirect } from './utils/routeLocalize';
import useOnAnyRender from './utils/useOnAnyRender';
import { translate } from './utils/translator';

import Header from "./partials/Header";
import Main from './partials/Main';
import Footer from './partials/Footer';
import BootstrapBreakpoints from './parts/BootstrapBreakpoints';

// turn off when not needed for debugging
const showBootstrapBreakpoints = true;

export default function App() {

  // translate static content
  useOnAnyRender(translate);

  // redirect to the correct language
  useLangRedirect();

  // scroll to top of the page (app is run on ever)
  useNavigate();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  return <>
    <Header />
    <Main />
    <Footer />
    {showBootstrapBreakpoints ? <BootstrapBreakpoints /> : null}
  </>;
};