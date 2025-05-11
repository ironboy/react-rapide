import LoremIpsum from '../parts/LoremIpsum';
import Image from '../parts/Image';

AboutPage.route = {
  path: '/about-us',
  menuLabel: 'About us',
  index: 2
};

export default function AboutPage() {
  return <>
    <h2>About us</h2>
    <Image
      src="/images/us.jpg"
      alt="A group photo of our employees."
    />
    <p>This is the story about us. We will tell you more about our company here.</p>
    <LoremIpsum />
  </>;
}