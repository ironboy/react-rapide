import { Link } from 'react-router-dom';
import Product from '../interfaces/Product';
import productsJson from '../json/products.json';

ProductsPage.route = {
  element: <ProductsPage />,
  path: '/products',
  menuLabel: 'Our products',
  index: 3
};

const products = productsJson as Product[];

export default function ProductsPage() {
  return <>
    <h2>Our products</h2>
    <p>Our products are fantastic, organic and fresh.</p>
    {products.map(({ id, name, quantity, price$, slug }) => (
      <Link to={'/images/products/' + slug}>
        <img src={'/images/products/' + id + '.jpg'} />
        <h3>{name}</h3>
        <p><strong>Quantity</strong>: {quantity}</p>
        <p>Price: ${price$}</p>
      </Link>
    ))}
  </>;
}