import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../Store/Store';
import axios from 'axios';
import "../styles/Recovery.css";
import { BASE_URL } from '../utilis/config';
import { useNavigate } from 'react-router-dom';
const OTP = () => {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const OTPEmail = useAuthStore(state => state.auth.OTPEmail);
  const setotp = useAuthStore(state => state.setOTP)
  console.log(OTPEmail);
  useEffect(() => {
    const fetchData = (async () => {
      try {
        const encodedEmail = encodeURIComponent(OTPEmail);
        const res = await axios.get(`${BASE_URL}/generateOTP`, { params: { email: encodedEmail } });
        if (res.status === 201) {
          let text = `Your Password Recovery code is ${res?.data?.code}`;
          const username = "User";
          const response = await axios.post(`${BASE_URL}/registerMail`, { username, email: encodedEmail, text, subject: "Password Recovery OTP" });
          if (response.status !== 200) {
            return alert("OTP not sent, Please try again");
          }
        }
      }
      catch (err) {
        alert(err.response.data.message);
        return navigate('/recovery');
      }
    })
    fetchData();
  }, [OTPEmail, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setotp(OTP);
    const res = await axios.get(`${BASE_URL}/verifyOTP`, { params: { code: OTP } });
    console.log(res);
    navigate('/resetPassword');
  }

  const resendOTP = async () => {
    try {
      const encodedEmail = encodeURIComponent(OTPEmail);
      const res = await axios.get(`${BASE_URL}/generateOTP`, { params: { email: encodedEmail } });
      if (res.status === 201) {
        let text = `Your Password Recovery code is ${res?.data?.code}`;
        const username = "User";
        const response = await axios.post(`${BASE_URL}/registerMail`, { username, email: encodedEmail, text, subject: "Password Recovery OTP" });
        if (response.status !== 200) {
          return alert("OTP not sent, Please try again");
        }
      }
    }
    catch (err) {
      alert(err.response.data.message);
      return navigate('/recovery');
    }
   }
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center box">
        <div className="glass">
          <div className="title text-center">
            <span className="py-4 text-xxl w-75 text-center text-gray-500">Enter your OTP send to your Email here</span>
          </div>
          <form className="py-1 form" onSubmit={handleSubmit}>
            <div className="textbox d-flex flex-column align-items-center gap-4">
              <div className="name d-flex w-75 gap-4">
                <input className="form-control h-100 p-3" type="text" placeholder="OTP*" onChange={(e) => { setOTP(e.target.value) }} />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <div className='resend'>
                <span>Didn't Receive OTP? <span className='otp' onClick={resendOTP}>Resend OTP</span> </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OTP
