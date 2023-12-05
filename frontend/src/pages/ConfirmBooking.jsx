import React, {useState, useEffect } from 'react'
import "../styles/ConfirmBooking.css";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utilis/config';
const ConfirmBooking = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const confirmBooking = async () => {
            try {
                const res = await axios.put(`${BASE_URL}/booking/confirm/${bookingId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-type": "Application/json",
                        },
                    });

                if (res.status !== 200) {
                    alert("Error in confirmation of your booking");
                    return navigate("/failed");
                }
                if (res.status === 200) {
                    const response = await axios.get(`${BASE_URL}/gettour/${res?.data?.tourId}`);
                    const id = res?.data?.userId;
                    const user = await axios.get(`${BASE_URL}/getUser/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        "Content-type": "Application/json"
                    });
                    const bookDate = new Date(res?.data?.bookAt);
                    const formattedDate = bookDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });
                    const mailData = {
                        username: user?.data?.data?.username,
                        text: "Your have booked a tour to " + response?.data?.data?.city + " on " + formattedDate + " for " + res?.data?.guestSize + " guests.",
                        subject: "Booking Confirmation",
                        email: res?.data?.userEmail,
                    };
                    const encodedEmail = encodeURIComponent(mailData?.email);
                    await axios.post(`${BASE_URL}/registerMail`, { username: mailData?.username, email: encodedEmail, text: mailData?.text, subject: mailData?.subject });
                }
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
                navigate("/thank-you");
            }
        }
        confirmBooking();
    }, [bookingId, token, navigate]);
    return (
        <div className="con" style={{ pointerEvents: loading ? 'none' : 'auto' }}>
      {loading ? (
        <div className="waiting">
          <div className="loading-skeleton"></div>
        </div>
      ) : null}
      <p className="message">Please Wait....</p>
    </div>
    )
}

export default ConfirmBooking
