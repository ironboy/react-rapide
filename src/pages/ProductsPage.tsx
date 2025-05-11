import LoremIpsum from '../parts/LoremIpsum';

ProductsPage.route = {
  path: '/products',
  menuLabel: 'Our products',
  index: 3
};

export default function ProductsPage() {
  return <>
    <h2>Our products</h2>
    <img src="/images/products.jpg" alt="Cold-pressed juice next to slices of pineapple and mango." />
    <p>Our products are fantastic. We will list them here shortly.</p>
    <LoremIpsum />
  </>;
}