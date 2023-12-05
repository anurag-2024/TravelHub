import React, { useState } from 'react';
import '../styles/ConfirmEmail.css';
import { useAuthStore } from '../Store/Store';
import { BASE_URL } from '../utilis/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfirmEmail = () => {
    const navigate = useNavigate();
  const [confirmationCode, setConfirmationCode] = useState('');
  const UserEmail = useAuthStore(state => state.auth.userEmail);
  
  const handleConfirm = async () => {
     const code=confirmationCode;
     const res=await axios.get(`${BASE_URL}/verifyOTP`,{params:{code}});
    if(res.status===200){
        const decodedEmail = encodeURIComponent(UserEmail);
        const response=await axios.post(`${BASE_URL}/confirmEmail`,{params:{email:decodedEmail}});
        if(response.status===200){
            alert("Email Verified Successfully");
            navigate('/login');
        }
    }
    else{
       console.log(res);
       alert("Invalid OTP");
    }
  };
  return (
    <div className="confirm-email-container">
      <div className="confirm-email-content">
        <h2>Email Confirmation</h2>
        <p>Thank you for registering! Please check your email for the confirmation code.</p>
        <div className="confirmation-code-input">
          <label htmlFor="code">Enter Confirmation Code:</label>
          <input
            type="text"
            id="code"
            value={confirmationCode}
            onChange={(e)=>setConfirmationCode(e.target.value)}
          />
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
