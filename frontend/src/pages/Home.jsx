import React,{useRef,useEffect} from 'react'
import "../styles/Home.css";
import { Container, Row, Col} from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png"
import experienceImg from "../assets/images/experience.png";
import Subtitle from '../shared/Subtitle';
import Searchbar from '../shared/Searchbar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonials/Testimonials';
import Newsletter from '../shared/Newsletter';
import Typed from 'typed.js';
const Home = () => {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<i>memories</i>', '<i>experiences</i>','<i>adventures</i>','<i>moments</i>'],
      typeSpeed: 55,
      loop: true,
      backSpeed: 20,
      backDelay: 1000,
      loopCount: Infinity,
      showCursor: false,
    });
    
    return () => {
      typed.destroy();
    };
  }, []);
  
  return (
    <>
      <section>
        <Container className='d-flex'>
          <Row className='d-flex'>
            <Col lg="6">
              <div className='hero__content'>
                <div className='hero__subtitle d-flex align-items-center'>
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt=''></img>
                </div>
                <h1>Travelling opens the doors to creating <span class="highlight"><span ref={el} /></span></h1>
                <div >
                <p className='mt-48'>Explore the hidden gems, savor the flavors of different cultures, and create a tapestry of memories that will linger in your heart forever.Immerse yourself in the beauty of diverse landscapes, taste the authenticity of local cuisines. Traveling is not just a destination; it's a kaleidoscope of experiences waiting to be embraced.</p></div>
              </div>  
            </Col>
            <Col lg="2">
              <div className='hero__img-box'>
                <img src={heroImg} alt='' />
              </div>
            </Col>
            <Col lg="2">
              <div className='hero__img-box mt-4'>
                <video src={heroVideo} alt='' controls />
              </div>
            </Col>
            <Col lg="2">
              <div className='hero__img-box mt-5'>
                <img src={heroImg02} alt='' />
              </div>
            </Col>
            <Searchbar />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6" sm="12">
              <h5 className='services__subtitle'>What we serve</h5>
              <h2 className='services__title'>We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className='mb-5'>
              <Subtitle subtitle={"Explore"} />
              <h2 className='featured__tour-title'>Our Featured Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className='experience__content'>
                <Subtitle subtitle={"Experience"} />
                <h2>With our all experience <br /> we will serve you </h2>
                <p>
                Explore the world with confidence, guided by our seasoned experts. Immerse yourself in extraordinary adventures, where every detail is carefully curated to ensure unforgettable moments.
                </p>
              </div>
              <div className='counter__wrapper d-flex align-items-center gap-5'>
                <div className='counter__box'>
                  <span>2k+</span>
                  <h6>Successful Trips</h6>
                </div>
                <div className='counter__box'>
                  <span>1k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className='counter__box'>
                  <span>3+</span>
                  <h6>Years of Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className='experience__img'>
                <img src={experienceImg} alt=''></img>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className='gallery__title'>Visit our customers tour gallery</h2>
            </Col>
            <Col lg="12">
             <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>


      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className='testimonial__title'>What our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default Home
