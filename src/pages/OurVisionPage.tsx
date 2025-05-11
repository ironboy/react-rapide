import { Row, Col } from 'react-bootstrap';
import LoremIpsum from '../parts/LoremIpsum';
import Image from '../parts/Image';

OurVisionPage.route = {
  path: '/our-vision',
  menuLabel: 'Our Vision',
  index: 3
};

export default function OurVisionPage() {
  return <>
    <Row>
      <Col>
        <h2 className="text-primary">We run with our vision!</h2>
        <Image
          src="/images/start.jpg"
          alt="A runner's legs and hands at the starting line of a track race."
        />
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <p>This is a page about our vision. Here we describe it in detail.</p>
        <LoremIpsum count={2} />
      </Col>
      <Col md={6}>
        <LoremIpsum
          paragraphUpperBound={2}
          count={3}
        />
      </Col>
    </Row>
  </>;
}