import type Product from '../interfaces/Product';
import { useParams, Link, useLoaderData } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Image from '../parts/Image';
import productsLoader from '../utils/productsLoader';

ProductDetailsPage.route = {
  path: '/products/:slug',
  parent: '/',
  loader: productsLoader
};

export default function ProductDetailsPage() {

  // read the slug from the route parameter :slug
  const { slug } = useParams();

  // find the correct product based on its slug
  const product = (useLoaderData().products as Product[])
    .find(x => x.slug === slug) as Product;

  // if no product found, show 404
  if (!product) {
    return <NotFoundPage />;
  }

  // destructure the properties of the product
  const { id, name, quantity, price$, description } = product;

  return <article className="product">
    <h2>{name}</h2>
    <Image
      src={'/images/products/' + id + '.jpg'}
      alt={'Product image of the product ' + name + '.'}
    />
    {description.split('\n').map((x, i) => <p key={i}>{x}</p>)}
    <p><strong>Quantity</strong>: {quantity}</p>
    <p><strong>Price: ${price$.toFixed(2)}</strong></p>
    <p><Link to="/">
      <button>Back to the product list</button>
    </Link></p>
  </article>;
}