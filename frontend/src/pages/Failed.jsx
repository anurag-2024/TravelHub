import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import "../styles/PaymentFailed.css"; // Make sure to import your stylesheet

const PaymentFailed = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className='pt-5 text-center'>
            <div className='payment__failed'>
              <span><i className="ri-alert-line"></i></span>
              <h1 className='mb-3 fw-semibold'>Payment Failed</h1>
              <h3 className='mb-4'>Your payment was not successful</h3>
              <p>Please check your payment details and try again.</p>
              {/* <Button className='btn danger__btn w-25 failedbutton'><Link to="/checkout">Try Again</Link></Button> */}
              <Button className='btn primary__btn failedbutton'><Link to="/home">Back To Home Page</Link></Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default PaymentFailed;
