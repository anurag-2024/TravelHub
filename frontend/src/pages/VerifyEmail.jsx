import React,{useState} from 'react'
import "../styles/Recovery.css";
import axios from 'axios';
import { BASE_URL } from '../utilis/config';
import { useNavigate } from 'react-router-dom';
const VerifyEmail = () => {
    const navigate=useNavigate();
    const [email,setemail]=useState("");
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`${BASE_URL}/verifyEmail`,{email});
            if(res.status===200){
                navigate("/confirmEmail");
            }
        }
        catch(err){
            alert(err.response.data.message);
            console.log(err);
        }
    }
  return (
    <div>
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
    </div>
  )
}

export default VerifyEmail
