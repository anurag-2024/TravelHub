import React, { useState, useRef, useEffect } from 'react';
import "../styles/tour-detail.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams ,useNavigate} from "react-router-dom";
import calculateavgRating from '../utilis/avgrating.js';
import avatar from "../assets/images/avatar.jpg";
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import useFetch from '../hooks/useFetch.js';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../utilis/config.js';
import axios from 'axios';
import { useAuthStore } from '../Store/Store.js';
const TourDetail = () => {
  const navigate=useNavigate();
  const { id } = useParams();
  var decode = null;
  const token = localStorage.getItem('token');
  if (token) {
    decode = jwtDecode(token);
  }
  const { data } = useFetch(`/gettour/${id}`);
  const ReviewMsgRef = useRef("");
  const [tourRating, settourRating] = useState(null);
  const photo = data?.data?.photo;
  const title = data?.data?.title;
  const desc = data?.data?.desc;
  const price = data?.data?.price;
  const address = data?.data?.address;
  const reviews = data?.data?.reviews;
  const city = data?.data?.city;
  const distance = data?.data?.distance;
  const maxGroupSize = data?.data?.maxGroupSize;
  const { totalRating, avgRating } = calculateavgRating(reviews);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const username = useAuthStore(state => state.auth.username);
  const submitHandler = e => {
    e.preventDefault();
    const reviewText = ReviewMsgRef.current.value;
    if (username === "" || username === undefined) {
      alert("Please Login First");
      navigate("/login");
    }
    else {
      const data = {
        reviewText,
        rating: tourRating,
        tourId: id,
        userId: decode?.userId,
        username: username
      }
      axios.post(`${BASE_URL}/review/${id}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        "Content-type": "Application/json"
      })
        .then(res => {
          if (res.status === 201) {
            alert("Review Added Successfully");
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  const [users, setusers] = useState(null);
  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await axios.get(`${BASE_URL}/getallusers`);
      setusers(data?.data);
    }
    fetchdata();
  },[]);

  const userProfiles = reviews?.map(review => (
    users?.find(user => user._id === review?.userId)
  ));
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className='tour__content'>
                <img src={photo} alt='' />
                <div className='tour__info'>
                  <h2>{title}</h2>
                  <div className='d-flex align-items-center gap-5'>
                    <span className='tour__rating d-flex align-items-center gap-1'>
                      <i className='ri-star-fill' style={{ "color": "var(--secondary-color)" }}></i> {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? ("Not Rated") : (<span>({reviews?.length})</span>)}
                    </span>
                    <span>
                      <i className='ri-map-pin-user-fill'></i> {address}
                    </span>
                  </div>
                  <div className='tour__extra-details'>
                    <span>
                      <i className='ri-map-pin-2-line'>{city}</i>
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"> &#8360; {price} /per person</i>
                    </span>
                    <span>
                      <i className="ri-map-pin-time-line"> {distance} k/m</i>
                    </span>
                    <span>
                      <i className="ri-group-line"> {maxGroupSize}</i>
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                <div className='tour_reviews mt-4'>
                  <h4>Reviews ({reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} onClick={() => settourRating(i + 1)}>
                          {i + 1} <i className={i < tourRating ? "ri-star-fill" : "ri-star-line"}></i>
                        </span>
                      ))}
                    </div>
                    <div className='review__input'>
                      <input type='text' ref={ReviewMsgRef} placeholder='Share your thoughts...' required />
                      <button className='btn primary__btn text-white' type='submit'>
                        Submit
                      </button>
                    </div>
                  </Form>
                </div>
                <ListGroup className='user__reviews'>
                  {reviews?.map((review,index) => (
                    <div className='review__item' key={index}>
                    <img src={userProfiles[index]?.profile || avatar} alt='' />
                      <div className='w-100'>
                        <div className='d-flex align-items-center justify-content-between'>
                          <div>
                            <h5>{review?.username}</h5>
                            <p>{new Date(review?.createdAt).toLocaleDateString("en-US", options)}</p>
                          </div>
                          <span className='d-flex align-items-center'>
                            {review?.rating}<i className='ri-star-s-fill'></i>
                          </span>
                        </div>
                        <h6>{review?.reviewText}</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </Col>
            <Col lg="4">
              <Booking tour={data} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default TourDetail
