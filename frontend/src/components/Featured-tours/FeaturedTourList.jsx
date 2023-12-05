import React from 'react'
import TourCard from "../../shared/TourCard";
import { Col } from 'reactstrap';
import useFetch from '../../hooks/useFetch';

const FeaturedTourList = () => {
   const data=useFetch("/search/getFeaturedtour");
   const featuredTours=data?.data?.tours;
  return (
   <>
    {
        featuredTours?.map(tour=>{
           return <Col lg="3" md="6" sm="12" className='mb-4' key={tour?._id}><TourCard tour={tour} /></Col>
        })
    }
   </>
  )
}

export default FeaturedTourList
