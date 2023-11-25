import React,{useState} from 'react'
import "../styles/Recovery.css";
import { useAuthStore } from '../Store/Store';
import { useNavigate } from 'react-router-dom';
const Recovery = () => {
  const navigate=useNavigate();
  const [email,setemail]=useState("");
  const setOTPEmail=useAuthStore(state=>state.setOTPEmail);
    const handleSubmit=(e)=>{
      e.preventDefault();
      setOTPEmail(email);
      navigate('/otp');
    }
  return (
    <div className="container">
        <div className="d-flex justify-content-center align-items-center box">
          <div className="glass">
            <div className="title text-center">
              <span className="py-4 text-xl w-75 text-center text-gray-500">Enter your Email here</span>
            </div>
            <form className="py-1 form" onSubmit={handleSubmit}>
              <div className="textbox d-flex flex-column align-items-center gap-4">
                <div className="name d-flex w-75 gap-4">
                  <input  className="form-control h-100 p-3" type="text" placeholder="Email*" onChange={(e)=>{setemail(e.target.value)}} />
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

export default Recovery
