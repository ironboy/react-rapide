import LoremIpsum from '../parts/LoremIpsum';
import { useStateContext } from '../utils/useStateObject';

AboutPage.route = {
  path: '/about-us',
  menuLabel: 'About us',
  index: 2
};

export default function AboutPage() {
  const [{ bwImages }] = useStateContext();
  return <>
    <h2>About us</h2>
    <img src="/images/us.jpg" className={bwImages ? 'bw' : ''} />
    <p>This is the story about us. We will tell you more about our company here.</p>
    <LoremIpsum />
  </>;
}