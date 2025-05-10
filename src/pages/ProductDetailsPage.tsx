import { useParams, Link } from 'react-router-dom';
import Product from '../interfaces/Product';
import products from '../json/products.json';


ProductDetailsPage.route = {
  path: '/products/:slug'
};

export default function ProductDetailsPage() {
  // read the slug from the route parameter :slug
  const { slug } = useParams();
  // find the correct product based on its slug
  const { id, name, quantity, price$, description } =
    (products as Product[])
      .find(x => x.slug === slug) as Product;

  return <article className="product">
    <h2>{name}</h2>
    <img src={'/images/products/' + id + '.jpg'} />
    {description.split('\n').map((x, i) => <p key={i}>{x}</p>)}
    <p><strong>Quantity</strong>: {quantity}</p>
    <p><strong>Price: ${price$.toFixed(2)}</strong></p>
    <p><Link to="/">
      <button>Back to the product list</button>
    </Link></p>
  </article>;
}