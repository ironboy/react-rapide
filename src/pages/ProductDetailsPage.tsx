import { Row, Col } from 'react-bootstrap';
import { useParams, Link, useLoaderData } from 'react-router-dom';
import Image from '../parts/Image';
import Product from '../interfaces/Product';
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
  const { id, name, quantity, price$, description } =
    (useLoaderData().products as Product[])
      .find(x => x.slug === slug) as Product;

  return <article className="product-details">
    <Row>
      <Col>
        <h2 className="text-primary">{name}</h2>
        <Image src={'/images/products/' + id + '.jpg'} />
        {description.split('\n').map((x, i) => <p key={i}>{x}</p>)}
        <p><strong>Quantity</strong>: {quantity}</p>
        <p><strong>Price: ${price$.toFixed(2)}</strong></p>
        <p>
          <Link to="/" className="btn btn-primary float-end">
            Back to the product list
          </Link>
        </p>
      </Col>
    </Row>
  </article>;
}