import React,{useRef} from 'react'
import "./search-bar.css";
import {Col,Form,FormGroup} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utilis/config';
import axios from 'axios';
const Searchbar = () => {
    const locationRef=useRef("");
    const distanceRef=useRef(0);
    const maxGroupSizeRef=useRef(0);
    const navigate=useNavigate();
    const searchHandler=async()=>{
            const location=locationRef.current.value;
            const distance=distanceRef.current.value;
            const maxGroupSize=maxGroupSizeRef.current.value;
            if(location===""||distance===0||maxGroupSize===0){
                 return alert("All fields are required");
            }
            var res;
            try{
                res=await axios(BASE_URL+`/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`);
                console.log("Res",res);
                if(res?.status!==200){
                    alert("Something went Wrong");
                }
                navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,{state:res?.data});
            }
            catch(err){
                alert("No, Results Found!!");
            }
            
    }
  return (
    <Col lg="12">
        <div className='search__bar'>
            <Form className='d-flex align-items-center gap-4'>
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span>
                    <i className="ri-map-pin-line"></i>
                    </span>
                    <div>
                        <h6>Location</h6>
                        <input type='text' placeholder='Where are you going' ref={locationRef}></input>
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span>
                    <i className="ri-map-pin-time-line"></i>
                    </span>
                    <div>
                        <h6>Distance</h6>
                        <input type='number' placeholder='Distance k/m' ref={distanceRef}></input>
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form__group form__group-last'>
                    <span>
                    <i className="ri-group-line"></i>
                    </span>
                    <div>
                        <h6>Max People</h6>
                        <input type='number' placeholder='0'ref={maxGroupSizeRef}></input>
                    </div>
                </FormGroup>
                <span className='search__icon' type="submit" onClick={searchHandler}>
                <i className="ri-search-line"></i>
                </span>
            </Form>
        </div>
    </Col>
  )
}
export default Searchbar
