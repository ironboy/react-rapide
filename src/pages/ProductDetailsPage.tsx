import LoremIpsum from '../parts/LoremIpsum';

ProductDetailsPage.route = {
  element: <ProductDetailsPage />,
  path: '/products/:slug',
  index: 2
};

export default function ProductDetailsPage() {
  return <>
    <h2>About us</h2>
    <img src="/images/us.jpg"></img>
    <p>This is the story about us. We will tell you more about our company here.</p>
    <LoremIpsum />
  </>;
}