import React from 'react';
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";
const Testimonials = () => {
    const settings={
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint:992,
                settings:{
                    slidesToShow:2,
                    slideToScroll:1,
                    infinite:true,
                    dots:true
                },
            },
            {
                breakpoint:576,
                settings:{
                    slidesToShow:1,
                    slideToScroll:1
                },
            },
        ]
    }
  return (
   <Slider {...settings} >
    <div className='testimonial py-4 px-3'>
     <p>
     Embarking on a journey with this travel agency was like stepping into a dream. Each destination unfolded a new chapter of wonder and discovery. Truly, a travel experience beyond imagination.
     </p>
     <div className='d-flex align-items-center gap-4 mt-3'>
        <img src={ava01} className='w-25 h-25 rounded-2' alt='' />
        <div>
            <h5 className='mb-0 mt-3'>Sam Alter</h5>
            <p>Customer</p>
        </div>
     </div>
    </div>
    <div className='testimonial py-4 px-3'>
     <p>
     Incredible! The tours with this agency were more than vacations; they were immersive experiences. Our guide transformed each destination into a living story, making our journey unforgettable. 
     </p>
     <div className='d-flex align-items-center gap-4 mt-3'>
        <img src={ava02} className='w-25 h-25 rounded-2' alt='' />
        <div>
            <h5 className='mb-0 mt-3'>Sunny Wish</h5>
            <p>Customer</p>
        </div>
     </div>
    </div>
    <div className='testimonial py-4 px-3'>
     <p>
     Remarkable service! The attention to detail and personalization of our trip were outstanding. Every moment felt like a tailor-made adventure. This agency knows how to make travel unforgettable. 
     </p>
     <div className='d-flex align-items-center gap-4 mt-3'>
        <img src={ava03} className='w-25 h-25 rounded-2' alt='' />
        <div>
            <h5 className='mb-0 mt-3'>John doe</h5>
            <p>Customer</p>
        </div>
     </div>
    </div>
    <div className='testimonial py-4 px-3'>
     <p>
     Embarking on a journey with this travel agency was like stepping into a dream. Each destination unfolded a new chapter of wonder and discovery. Truly, a travel experience beyond imagination. 
     </p>
     <div className='d-flex align-items-center gap-4 mt-3'>
        <img src={ava01} className='w-25 h-25 rounded-2' alt='' />
        <div>
            <h5 className='mb-0 mt-3'>Sam Alter</h5>
            <p>Customer</p>
        </div>
     </div>
    </div>
    <div className='testimonial py-4 px-3'>
     <p>
     Incredible! The tours with this agency were more than vacations; they were immersive experiences. Our guide transformed each destination into a living story, making our journey unforgettable. 
     </p>
     <div className='d-flex align-items-center gap-4 mt-3'>
        <img src={ava02} className='w-25 h-25 rounded-2' alt='' />
        <div>
            <h5 className='mb-0 mt-3'>Sunny Wish</h5>
            <p>Customer</p>
        </div>
     </div>
    </div>
   </Slider>
  )
}

export default Testimonials
