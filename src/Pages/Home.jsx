// eslint-disable-next-line no-unused-vars
import React from 'react'
import Banner from '../components/Banner'

import Bestproduct from './Bestproducts'
import Bestsaler from './Bestsaler'
import FeaturesShowcase from '../components/FeaturesShowcase'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import BrandsShowcase from '../components/BrandsShowcase'
import StatsCounter from '../components/StatsCounter'
import ProductVideoShowcase from '../components/ProductVideoShowcase'

const Home = () => {
  return (
    <div>
      <Banner/>
    <Bestproduct/>
    <Bestsaler/>
    <ProductVideoShowcase/>
    <FeaturesShowcase/>
    <TestimonialsCarousel/>
    <BrandsShowcase/>
    <StatsCounter/>
    </div>
  )
}

export default Home