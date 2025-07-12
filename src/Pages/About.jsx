import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const About = () => {
  return (
    <div className=' mx-auto px-4 py-12 bg-gray-900 text-white'>
      {/*About us section*/}
      <h2 className='text-3xl font-semibold text-center mb-6 border-b-2 pb-2 inline-block text-teal-300'>
        ABOUT <span className='font-bold'>US</span>
      </h2>

      <div className='flex flex-col md:flex-row items-center  gap-10'>
        {/*Left Side Image*/}
        <div className=' md:w-1/2'>
          <img
          src={assets.about_img}
          alt='About Us'
          className='w-full rounded-lg shadow-lg'
          ></img>
        </div>

        {/*Right side - text content*/}
        <div className='w-full md:w-1/2 text-gray-300'>
           <p className='mb-4 leading-relaxed'>
            <strong>Forever</strong> was born out of a passion for innovation
            and a desire to revolutionize the way people shop online. Our
            journey began with a simple idea: to provide a platform where
            customers can easily discover, explore, and purchase a wide range of
            products from the comfort of their homes.
           </p>

           <p className='mb-4 leading-relaxed'>
           Since our inception, we’ve worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
           </p>

           <h3 className='text-xl font-semibold mt-6 mb-2 text-teal-300'>Our Mission</h3>
           <p className='leading-relaxed'>
            Our mission at <strong>Forever</strong> is to empower customers with
            choice, convenience, and confidence. We’re dedicated to providing a
            seamless shopping experience that exceeds expectations, from
            browsing and ordering to delivery and beyond.
           </p>
        </div>
      </div>
    
        {/*why choose us section*/}
        <div className='mt-16'>
          <h2 className='text-3xl font-semibold text-center mb-6 border-b-2 pb-2 inline-block text-teal-300'>
            WHY<span className='font-bold'> CHOOSE US</span>
          </h2>

          <div className='grid md:grid-cols-3 gap-8 text-gray-300 mt-6'>
            {/*Quality Assurance*/}
            <div className='bg-gray-800 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-3 text-teal-300'>Quality Assurance</h3>
              <p className='leading-relaxed'>
              We prioritize quality in all our products, ensuring they meet the
              highest standards before reaching our customers.
              </p>
            </div>

            {/*convenience*/}
            <div className='bg-gray-800 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-3 text-teal-300'>Convenience</h3>
              <p className='leading-relaxed'>
              Our seamless shopping experience allows you to browse, select, and
              purchase your favorite items with just a few clicks.
              </p>
            </div>

            {/*Exceptional Customer Services*/}
            <div className='bg-gray-800 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-3 text-teal-300'>
                Exceptional Customer Service
              </h3>
              <p className='leading-relaxed'>
              Our team is always ready to assist you with any inquiries,
              ensuring a smooth and satisfying shopping journey.
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default About;
