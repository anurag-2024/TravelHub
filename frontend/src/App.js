import "./App.css";
import React ,{useEffect} from 'react'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Gallery from "./pages/Gallery";
import SearchResultList from "./pages/SearchResultList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Thankyou from "./pages/Thankyou";
import PageNotFound from "./pages/PageNotFound";
import Failed from "./pages/Failed";
import Profile from "./pages/Profile";
import Recovery from "./pages/Recovery";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import ConfirmBooking from "./pages/ConfirmBooking";
import { Navigate,BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utilis/config";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
function App() {
  useEffect(() => {
    const handleUserClick = () => {
      new (window.AudioContext || window.webkitAudioContext)();
    };
    document.addEventListener('click', handleUserClick);
    return () => {
      document.removeEventListener('click', handleUserClick);
    };
  }, []);
  Kommunicate.init(process.env.REACT_APP_STRIPE_APP_KEY, {
    automaticChatOpenOnNavigation: true,
    popupWidget: true
  });

  const ProtectUser = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to={"/"} replace={true}></Navigate>
    }
    return children;
}

const ProtectResetPassword =({ children }) => {
  useEffect(() => {
      const getData = async () => {
          const response = await axios.get(`${BASE_URL}/createResetSession`);
          if (response?.status !== 201 || response?.data?.flag !== true) {
              return <Navigate to={"/recovery"} replace={true}></Navigate>
          }
      }
    getData();
  },[])
  return children;
}
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/home' element={<><Header/><Home/><Footer/></>} />
        <Route path='/about' element={<><Header/><About/><Footer/></>} />
        <Route path='/tours' element={<><Header/><Tours/><Footer/></>} />
        <Route path='/gallery' element={<><Header/><Gallery/><Footer/></>} />
        <Route path='/tours/:id' element={<><Header/><TourDetail/><Footer/></>} />
        <Route path='/login' element={<><Header/><Login/><Footer/></>} />
        <Route path='/register' element={<><Header/><Register/><Footer/></>} />
        <Route path='/tours/search' element={<><Header/><SearchResultList/><Footer/></>} />
        <Route path='/thank-you' element={<><Header/><Thankyou/><Footer/></>} />
        <Route path='/failed' element={<><Header/><Failed/><Footer/></>} />
        <Route path='/profile' element={<><Header/><ProtectUser><Profile/></ProtectUser><Footer/></>} />
        <Route path='/recovery' element={<><Header/><Recovery/><Footer/></>} />
        <Route path='/otp' element={<><Header/><OTP/><Footer/></>} />
        <Route path='/resetPassword' element={<><Header/><ProtectResetPassword><ResetPassword/></ProtectResetPassword><Footer/></>} />
        <Route path='/confirmBooking/:bookingId' element={<ConfirmBooking/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
    </>
  ); 
}
export default App;
