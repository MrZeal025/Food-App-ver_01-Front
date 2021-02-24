import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

const logoLight = process.env.PUBLIC_URL + '/assets/logowhite@2x.png';

export default function Footer(params) {
  return(
    <footer>
      <Container>
        <div className="footer-primary">
          <Row>
            <Col md className="footer-primary-item">
              <Row >
                <img src={logoLight} alt="Logo-light" className="footer-logo mr-10" />
                <h3>Bitezoo</h3>
              </Row>
              <p  className="ml-2">Bitezoo is a food app that contains recipes that are posted in the web app.
                This app will help people who have a hard time finding recipes to cook for theirselves or their family.
              </p>
            </Col>
            <Col md className="footer-primary-item">
              <h3 className="mb-20">Follow us on Social Media</h3>
              <Row className="ml-2">
                <img  
                  className="mr-10" 
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-512.png" 
                  alt="facebook"
                  height="30" 
                />
                <img 
                  className="mr-10" 
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-512.png" 
                  alt="twitter"
                  height="30"
                />
                <img 
                  src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" 
                  alt="instagram"
                  height="30"/>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="footer-secondary">
          &copy; Bitezoo, Inc. 2021
        </div>
      </Container>
    </footer>
  )
}
