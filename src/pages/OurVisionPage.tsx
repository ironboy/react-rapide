import LoremIpsum from '../parts/LoremIpsum';
import { useStateContext } from '../utils/useStateObject';

OurVisionPage.route = {
  path: '/our-vision',
  menuLabel: 'Our Vision',
  index: 3
};

export default function OurVisionPage() {
  const [{ bwImages }] = useStateContext();
  return <>
    <h2>We run with our vision!</h2>
    <img src="/images/start.jpg" className={bwImages ? 'bw' : ''} />
    <p>This is a page about our vision. Here we describe it in detail.</p>
    <LoremIpsum />
  </>;
}