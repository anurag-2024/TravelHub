import React,{useState} from 'react'
import "../styles/ResetPassword.css";
import axios from 'axios';
import { useAuthStore } from '../Store/Store';
import { BASE_URL } from '../utilis/config';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const navigate=useNavigate();
    const [password,setpassword]=useState("");
    const [confirmPassword,setconfirmPassword]=useState("");
    const OTPEmail=useAuthStore(state=>state.auth.OTPEmail);
    const encodedEmail = encodeURIComponent(OTPEmail);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            alert("Password and Confirm Password does not match");
        }
        else{
            console.log(encodedEmail,password);
            const res=await axios.put(`${BASE_URL}/resetPassword`,{email:encodedEmail,password})
            if(res.status===200){
                navigate("/login");
            }
            else{
               return alert("Something went wrong, Please try again later");
            }
        }
    }
  return (
    <div className="container">
        <div className="d-flex justify-content-center align-items-center box">
          <div className="glass">
            <div className="title text-center">
              <span className="py-4 text-xl w-75 text-center text-gray-500">Enter your new Password here</span>
            </div>
            <form className="py-1 form" onSubmit={handleSubmit}>
              <div className="textbox d-flex flex-column align-items-center gap-4">
                <div className="name d-flex w-75 gap-4">
                  <input  className="form-control h-100 p-3" type="password" placeholder="New Password*" onChange={(e)=>{setpassword(e.target.value)}} />
                  <input  className="form-control h-100 p-3" type="password" placeholder="Confirm New Password*" onChange={(e)=>{setconfirmPassword(e.target.value)}} />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default ResetPassword
