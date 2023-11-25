// About.jsx

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/About.css';

const About = () => {
  return (
    <section className="about-section">
      <Container>
        <Row>
          <Col lg="12">
            <h2 className="about-title">About Us</h2>
            <p className="about-description">
              Welcome to TravelHub, where the journey is as important as the destination. We are not just a travel platform; we are your partners in exploration, adventure, and discovery.
            </p>
            <p className="about-description">
              Our story began with a shared passion for travel and a vision to create a space where every traveler's dream can come true. At TravelHub, we believe that travel has the power to transform, inspire, and connect people from all walks of life.
            </p>
            <p className="about-description">
              What defines us is our commitment to providing authentic and immersive experiences. We collaborate with local guides, communities, and experts to bring you a collection of handpicked tours that go beyond the ordinary. From hidden gems to iconic landmarks, each journey is designed to leave you with lasting memories.
            </p>
            <p className="about-description">
              Our platform is built on the principles of sustainability, responsibility, and inclusivity. We strive to minimize our environmental impact and support local economies. Every trip you take with us contributes to the well-being of the places you visit and the people you meet along the way.
            </p>
            <p className="about-description">
              Whether you're a solo traveler, a couple seeking a romantic getaway, or a family in search of adventure, TravelHub is here to cater to your unique desires. We value diversity, respect, and the joy of shared experiences.
            </p>
            <p className="about-description">
              Join us in creating a world where borders are bridges, cultures are celebrated, and every journey becomes a chapter in your life's story. Let TravelHub be your guide to a world of possibilities.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;
