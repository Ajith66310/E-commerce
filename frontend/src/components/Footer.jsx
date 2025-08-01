import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-3">
      <Container>
        <div>
          <a href="">Home</a>
        </div>
        <a href="">agdff</a>
        <Row>
          <Col className="text-center" >
            <p className="text-muted">© {new Date().getFullYear()} My Website. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;