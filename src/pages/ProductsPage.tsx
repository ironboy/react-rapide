import { Link } from 'react-router-dom';
import Product from '../interfaces/Product';
import products from '../json/products.json';

ProductsPage.route = {
  element: <ProductsPage />,
  path: '/products',
  menuLabel: 'Our products',
  index: 1
};

export default function ProductsPage() {
  return <>
    <h2>Our products</h2>
    <p>
      Our products are fantastic, organic and fresh.
      They are also very reasonably priced considering
      they all harvested with the greatest care.
    </p>
    <p>Click on a product for detailed info.</p>
    <section className="products">
      {(products as Product[]).map((
        { id, name, quantity, price$, slug }
      ) => (
        <Link to={'/products/' + slug}>
          <img src={'/images/products/' + id + '.jpg'} />
          <h3>{name}</h3>
          <p><strong>Quantity</strong>: {quantity}</p>
          <p><strong>Price: ${price$.toFixed(2)}</strong></p>
        </Link>
      ))}
    </section>
  </>;
}