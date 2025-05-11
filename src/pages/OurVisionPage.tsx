import LoremIpsum from '../parts/LoremIpsum';
import Image from '../parts/Image';

OurVisionPage.route = {
  path: '/our-vision',
  menuLabel: 'Our Vision',
  index: 3
};

export default function OurVisionPage() {
  return <>
    <h2>We run with our vision!</h2>
    <Image
      src="/images/start.jpg"
      alt="A runner's legs and hands at the starting line of a track race."
    />
    <p>This is a page about our vision. Here we describe it in detail.</p>
    <LoremIpsum />
  </>;
}