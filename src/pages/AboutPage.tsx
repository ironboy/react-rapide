import LoremIpsum from '../parts/LoremIpsum';

AboutPage.route = {
  element: <AboutPage />,
  path: '/about-us',
  menuLabel: 'About us'
};

export default function AboutPage() {
  return <>
    <h2>About us</h2>
    <img src="/images/us.jpg"></img>
    <p>This is the story about us. We will tell you more about our company here.</p>
    <LoremIpsum />
  </>;
}