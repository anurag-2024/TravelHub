import React, { useState, useEffect } from 'react'
import Subtitle from '../shared/Subtitle';
import axios from 'axios';
import "../styles/Profile.css";
import { BASE_URL } from '../utilis/config';
import userIcon from "../assets/images/user.png";
import { jwtDecode } from 'jwt-decode';
const Profile = () => {
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const [profile, setprofile] = useState(null);
  const [file, setfile] = useState();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobile, setmobile] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [isbooking, setisbooking] = useState(null);
  const [Bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchData = (async () => {
      if (token) {
        try{
          console.log("decode?.userId",decode?.userId)
          const res = await axios.get(`${BASE_URL}/userbooking/${decode?.userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            "Content-type": "Application/json"
          });
          setisbooking(true);
          setBookings(res?.data?.data);
          if(Bookings.length === 0) setisbooking(false);
          console.log("bookings", res?.data?.data);
        }
        catch(err){
          setisbooking(false);
          console.log("err",err);
        }
      }
    })
    fetchData();
  }, [token,Bookings.length,decode?.userId]);

  useEffect(() => {
    const fetchData = (async () => {
      if (token) {
        const res = await axios.get(`${BASE_URL}/getUser/${decode?.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          "Content-type": "Application/json"
        });
        console.log("profile", res);
        setprofile(res?.data?.data?.profile || "");
        setfirstName(res?.data?.data?.firstName || "");
        setlastName(res?.data?.data?.lastName || "");
        setmobile(res?.data?.data?.mobile || "");
        setaddress(res?.data?.data?.address || "");
        setemail(res?.data?.data?.email || "");
      }
    })
    fetchData();
  }, [token,decode?.userId]);
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setfile(base64);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      mobile,
      address,
      email,
      profile: file
    }
    const update = (async () => {
      const res = await axios.put(`${BASE_URL}/updateUser/${decode?.userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        "Content-type": "Application/json"
      });
      console.log("update", res);
      if (res.status === 200) {
        alert("User updated successfully");
        window.location.reload();
      }
      if (res.status === 500) {
        alert("Something went wrong, please try again");
      }
    })
    update();
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'red'; 
      case 'Confirmed':
        return 'green'; 
      default:
        return 'black'; 
    }
  };
  
  return (
    <>
      <div className="subtitle">
        <Subtitle subtitle={"User Dashboard"} />
      </div>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="glass">
            <div className="title text-center">
              <h4 className="text-5xl font-bold">Profile</h4>
              <span className="py-4 text-xl w-75 text-center text-gray-500">You can update the details</span>
            </div>
            <form className="py-1" onSubmit={handleSubmit}>
              <div className="profile d-flex justify-content-center py-4 mb-8 ms-5">
                <label htmlFor="profile">
                  <img src={file || profile || userIcon} alt="" className="profile_img" />
                </label>
                <input onChange={onUpload} type="file" id="profile" name="profile" accept="image/png, image/jpeg" />
              </div>
              <div className="textbox d-flex flex-column align-items-center gap-4">
                <div className="name d-flex w-75 gap-4">
                  <input
                    className="form-control h-100 p-3"
                    type="text"
                    value={firstName}
                    placeholder="Firstname"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                  <input
                    className="form-control h-100 p-3"
                    type="text"
                    value={lastName}
                    placeholder="Lastname"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
                <div className="name d-flex w-75 gap-4">
                  <input className="form-control h-100 p-3" value={mobile} type="text" placeholder="Mobile No." onChange={(e) => { setmobile(e.target.value) }} />
                  <input className="form-control h-100 p-3" value={email} type="text" placeholder="Email*" onChange={(e) => { setemail(e.target.value) }} />
                </div>
                <input className="form-control w-75 h-100 p-3" value={address} type="text" placeholder="Address" onChange={(e) => setaddress(e.target.value)} />
                <button type="submit" className="button btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bookings">
        <Subtitle subtitle={"Bookings"} />
      </div>
      {
        !isbooking ?  <div className="container no-bookings"> No Bookings available!!</div> :
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Tour Name</th>
                <th>Date of Tour</th>
                <th>Guest Size</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{booking?.tourName}</td>
                  <td>{formatDate(booking?.bookAt)}</td>
                  <td>{booking?.guestSize}</td>
                  <td style={{ color: getStatusColor(booking?.status) }}>{booking?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </>
  )
}

export default Profile
