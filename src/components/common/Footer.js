import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

const logoLight = process.env.PUBLIC_URL + '/assets/bite-temp-holder.png';

export default function Footer(params) {
  return(
    <footer>
      <Container>
        <div className="footer-primary">
          <Row>
            <Col md className="footer-primary-item">
              <img src={logoLight} alt="Logo - light" className="footer-logo" />
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta eaque deleniti fugit adipisci. Id, doloremque animi?</p>
            </Col>
            <Col md className="footer-primary-item">
              <h3>Heading 1</h3>
              <ul className="list-unstyled">
                <li><a href="/">Item 1</a></li>
                <li><a href="/">Item 2</a></li>
                <li><a href="/">Item 3</a></li>
                <li><a href="/">Item 4</a></li>
              </ul>
            </Col>
            <Col md className="footer-primary-item">
              <h3>Heading 2</h3>
              <ul className="list-unstyled">
                <li><a href="/">Alpha</a></li>
                <li><a href="/">Bravo</a></li>
                <li><a href="/">Charlie</a></li>
                <li><a href="/">Delta</a></li>
              </ul>
            </Col>
          </Row>
        </div>
        <div className="footer-secondary">
          &copy; Bitezoo, Inc. 2020
        </div>
      </Container>
    </footer>
  )
}
