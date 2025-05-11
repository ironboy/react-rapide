import { Row, Col } from 'react-bootstrap';
import LoremIpsum from '../parts/LoremIpsum';
import Image from '../parts/Image';

AboutPage.route = {
  path: '/about-us',
  menuLabel: 'About us',
  index: 2
};

export default function AboutPage() {
  return <>
    <Row>
      <Col>
        <h2 className="text-primary">About us</h2>
        <Image
          src="/images/us.jpg"
          alt="A group photo of our employees."
        />
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <p>This is the story about us. We will tell you more about our company here.</p>
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