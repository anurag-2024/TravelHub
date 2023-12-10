import React from 'react';
import "./footer.css";
import {Container,Row,Col,ListGroup,ListGroupItem} from "reactstrap";
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo.png";

const quick_links=[
  {
    path:"/home",
    display:"Home"
  },
  {
    path:"/about",
    display:"About"
  },
  {
    path:"/tours",
    display:"Tours"
  }
]

const quick_links2=[
  {
    path:"/gallery",
    display:"Gallery"
  },
  {
    path:"/login",
    display:"Login"
  },
  {
    path:"/register",
    display:"Register"
  }
]
const Footer = () => {
  const year=new Date().getFullYear();
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg="3" className='footlink'>
            <div className='logo' >
              <img src={logo} alt='' />
              <p>Your gateway to unforgettable journeys. Explore the world with us and create memories that last a lifetime.</p>
              <div className='social__links d-flex align-items-center gap-4'>
                <span>
                  <Link to="#"><i className="ri-youtube-line"></i></Link>
                </span>
                <span>
                  <a href='https://github.com/anurag-2024'><i className="ri-github-fill"></i></a>
                </span>
                <span>
                  <a href='https://www.facebook.com/profile.php?id=100052788078524c'><i className="ri-facebook-circle-line"></i></a>
                </span>
                <span>
                  <a href='https://www.instagram.com/iam_anurag2420/'><i className="ri-instagram-line"></i></a>
                </span>
              </div>
            </div>
          </Col>
          <Col lg="3">
            <h5 className='footer__link-title'>Discover</h5>
            <ListGroup className='footer__quick-links'>
              {
                quick_links.map((item,index)=>{
                  return <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                })
              }
            </ListGroup>
          </Col>
          <Col lg="3">
          <h5 className='footer__link-title'>Quick Links</h5>
            <ListGroup className='footer__quick-links'>
              {
                quick_links2.map((item,index)=>{
                  return <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                })
              }
            </ListGroup>
          </Col>
          <Col lg="3">
          <h5 className='footer__link-title'>Contact</h5>
            <ListGroup className='footer__quick-links'>
                   <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                    <h6 className='mb-0 d-flex align-items-center gap-2'>
                      <span><i className="ri-map-pin-line"></i></span>
                      Address:
                    </h6>
                    <p className='mb-0'>Uttar Pradesh,India</p>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                    <h6 className='mb-0 d-flex align-items-center gap-2'>
                      <span><i className="ri-mail-line"></i></span>
                      Email:
                    </h6>
                    <p className='mb-0'>anuragpatelxxxxxx@gmail.com</p>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                    <h6 className='mb-0 d-flex align-items-center gap-2'>
                      <span><i className="ri-phone-fill"></i></span>
                      Phone:
                    </h6>
                    <p className='mb-0'>+91 8090xxxxxx</p>
                  </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="12" className='text-center pt-5'>
            <p className='copyright'>Copyright <span>{year}</span>,developed by <span>Anurag Patel</span>. All rights are reserved!!</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

