import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useStateObject } from '../utils/useStateObject';


export default function Main() {
  // a state to use with outlet context
  const stateAndSetter = useStateObject({
    categoryChoice: 'All',
    sortChoice: 'Price (low to high)',
    bwImages: false
  });

  return <main>
    <Container className="mt-5">
      <Outlet context={stateAndSetter} />
    </Container>;
  </main>;
}