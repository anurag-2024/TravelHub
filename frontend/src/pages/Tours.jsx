import React, { useEffect, useState } from 'react'
import CommonSection from '../shared/CommonSection';
import "../styles/tour.css";
import TourCard from '../shared/TourCard';
import Searchbar from '../shared/Searchbar';
import Newsletter from '../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';
import Typed from 'typed.js';
import useFetch from '../hooks/useFetch';

const Tours = () => {
  const [pageCount, setpageCount] = useState(0);
  const [page, setpage] = useState(0);
  const tour = useFetch(`/getAlltours?page=${page}`);
  const { data } = tour;
  const count = useFetch(`/search/getTourCount`);
  const countData = count?.data?.count;
  useEffect(() => {
    if (countData) {
      const pages = Math.ceil(countData/8);
      setpageCount(pages);
      window.scrollTo(0, 0);
    }
  }, [page,countData]);

  const el = React.useRef(null);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['All Tours'],
      typeSpeed: 100,
      loop: true,
      backSpeed: 90,
      backDelay: 1500,
      loopCount: Infinity,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <CommonSection title={<span ref={el} />} />
      <section>
        <Container>
          <Row>
            <Searchbar />
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            {
              data?.tours?.map((item, index) => {
                return <Col className="adjust" lg="3" md="6" sm="12" key={index}><TourCard tour={item} /></Col>
              })
            }
          </Row>
          <Col lg="12">
            <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
              {[...Array(pageCount).keys()].map(number => (
                <span key={number} onClick={() => setpage(number)} className={page === number ? "active__page" : ""}>
                  {number + 1}
                </span>
              ))}
            </div>
          </Col>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default Tours
