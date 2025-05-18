import type Product from '../interfaces/Product';
import { Link } from 'react-router-dom';
import products from '../json/products.json';

ProductsPage.route = {
  path: '/',
  menuLabel: 'Products',
  index: 1,
  parent: '/'
};

export default function ProductsPage() {
  return <>
    <h2>Our products</h2>
    <p>
      Our products are fantastic, organic and fresh.
      They are also very reasonably priced, considering
      they are all harvested with the greatest care.
    </p>
    <p>Click on a product for detailed info.</p>
    <section className="products">
      {(products as Product[]).map((
        { id, name, quantity, price$, slug }
      ) => (
        <Link key={id} to={'/products/' + slug}>
          <img
            src={'/images/products/' + id + '.jpg'}
            alt={'Product image of the product ' + name + '.'}
          />
          <h3>{name}</h3>
          <p><strong>Quantity</strong>: {quantity}</p>
          <p><strong>Price: ${price$.toFixed(2)}</strong></p>
        </Link>
      ))}
    </section>
  </>;
}