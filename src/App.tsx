import { useLocation } from 'react-router-dom';
import Header from "./partials/Header";
import Main from './partials/Main';
import Footer from './partials/Footer';


export default function App() {

  // scroll to top when the route changes
  useLocation();
  window.scrollTo(0, 0);

  return <>
    <Header />
    <Main />
    <Footer />
  </>;
};;