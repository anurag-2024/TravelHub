import React, { useState } from 'react';
import "./booking.css";
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import {useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Store/Store';
import axios from 'axios';
import { BASE_URL } from '../../utilis/config';
import useFetch from '../../hooks/useFetch';
import {loadStripe} from '@stripe/stripe-js';

const Booking = ({ tour, avgRating }) => {
    const [fullName, setfullName] = useState("");
    const [phone, setphone] = useState("");
    const [bookAt, setbookAt] = useState("");
    const [guestSize, setguestSize] = useState(1);
    const price = tour?.data?.price;
    const reviews = tour?.data?.reviews;
    const userId = useAuthStore(state => state.auth.userId);
    const userEmail = useAuthStore(state => state.auth.userEmail);
    const token = localStorage.getItem('token');
    const params = useParams();
    const { data } = useFetch(`/gettour/${params.id}`);
    const tourName = data?.data?.title;
    const navigate = useNavigate();
    const credentials= {
        userId,
        tourId:params.id,
        userEmail,
        tourName,
        fullName,
        phone,
        guestSize,
        bookAt,
    }
    const ServiceFee = 10;
    const totalPrice = Number(price) * Number(credentials.guestSize);
    const totalAmount = Number(price) * Number(credentials.guestSize) + Number(ServiceFee);

    
    const handleClick = async (e) => {
        e.preventDefault();
        if (userId === "" || userId === undefined) {
            alert("Please Login First");
            navigate("/login");
        }
        else if(credentials.userEmail === "" ||credentials.userId===""||credentials.tourName===""){
            return alert("Something went wrong")
        }
        else {
            await axios.post(`${BASE_URL}/booking/pending`, credentials, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                "Content-type": "Application/json"
            })
            .then(res => {
                if (res.status === 201) {
                    // Continue with payment process
                    makePayment(res.data._id);
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Please Fill All the Fields");
            })
        }
    }
    
    const makePayment = async (bookingId) => {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
        if (token === null || !token || token === undefined) {
            alert("Please Login First");
            return navigate("/login");
        }
        try {
            const response = await axios.post(
                `${BASE_URL}/create-checkout-session`,
                {
                    totalAmount: totalAmount,
                    bookingId: bookingId,
                    guestSize: credentials.guestSize,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "Application/json",
                    },
                }
            );
            if (response.status !== 200) {
                return alert("Something went wrong");
            }
            await stripe.redirectToCheckout({
                sessionId: response.data.id,
            });
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };

    return (
        <div className='booking'>
            <div className='booking__top d-flex align-items-center justify-content-between'>
                <h3>&#8360; {price} /per person</h3>
                <span className='tour__rating d-flex align-items-center'>
                    <i className='ri-star-fill' style={{ "color": "var(--secondary-color)" }}></i>
                    {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>
            <div className='booking__form'>
                <h5>Information</h5>
                <Form className='booking__info-form'>
                    <FormGroup>
                        <input type='text' placeholder='Full Name' id='fullName' required onChange={(e)=>{setfullName(e.target.value)}} />
                    </FormGroup>
                    <FormGroup>
                        <input type='number' placeholder='Phone' id='phone' required onChange={(e)=>{setphone(e.target.value)}} />
                    </FormGroup>
                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input type='date' placeholder='' id='bookAt' required onChange={(e)=>{setbookAt(e.target.value)}} />
                        <input type='number' placeholder='guestSize' id='guestSize' required onChange={(e)=>{setguestSize(e.target.value)}} />
                    </FormGroup>
                </Form>
            </div>
            <div className='booking__bottom'>
                <ListGroup>
                    <ListGroupItem className='border-0 px-0'>
                        <h5 className='d-flex align-items-center gap-1'>&#8360; {price} <i className='ri-close-line'></i> {credentials.guestSize === "" ? 1 : credentials.guestSize} person</h5>
                        <span>&#8360; {credentials.guestSize === "" ? price : totalPrice}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0'>
                        <h5>Service charge</h5>
                        <span>&#8360; {ServiceFee}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0 total'>
                        <h5>Total</h5>
                        <span>&#8360; {totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>
                <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
            </div>
        </div>
    )
}

export default Booking
