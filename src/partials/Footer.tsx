import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return <footer>
    <Container fluid>
      <Row>
        <Col className="text-center py-4 text-bg-primary">
          © The Good Grocery {new Date().getFullYear()}
        </Col>
      </Row>
    </Container>
  </footer>;
}