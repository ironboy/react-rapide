import type Product from '../interfaces/Product';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../utils/useStateObject';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Image from './Image';

async function buy(e: React.MouseEvent, productId: number, setState: Function) {
  e.stopPropagation();
  await fetch('/api/change-product-in-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity: 1, add: true })
  });
  setState('showShoppingCart', true);
}

export default function ProductCard(
  { id, name, quantity, price$, slug }: Product
) {
  const navigate = useNavigate();
  const [_state, setState] = useStateContext();
  return <Card
    className="mb-4 border-0"
    role="button" /*sets the cursor to pointer*/
    onClick={() => navigate('/products/' + slug)}
  >
    <Card.Body as={Row} className="pb-4">
      <Col className="mb-n5">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="mb-0">
          <strong className=" d-sm-none">Qty:</strong>
          <strong className="d-none d-none d-sm-inline-block">Quantity:</strong>
          <span className="float-end">{quantity}</span>
        </Card.Text>
        <Card.Text>
          <strong>
            Price:
            <span className="float-end">${price$.toFixed(2)}</span>
          </strong>
        </Card.Text>
        <Button variant="primary w-100">More info</Button>
        <Button variant="primary me-5 mt-3 w-100" onClick={e => buy(e, id, setState)}>Buy</Button>
      </Col>
      <Col className="mb-n2">
        <Card.Img
          as={Image}
          src={'/images/products/' + id + '.jpg'}
          alt={'Product image of the product ' + name + '.'}
          className="h-100"
        />
      </Col>
    </Card.Body>
  </Card >;
}