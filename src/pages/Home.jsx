import React from 'react'
import ScrollLabel from '../components/LadingHeader/ScrollLabel'
import Header from '../components/LadingHeader/Header'
import ProductNavigator from '../utils/ProductNavigator'
import image1 from '../assets/home/homebg2.jpg'
import image2 from '../assets/home/homebg3.jpg'
import image2mb from '../assets/home/homebg3mb.jpg'
import HomeMobile1 from '../components/Home/HomeMobile1'
import brandLabellingImage from '../assets/brand/brandLabelling.jpg'
import OurProducts from '../components/Home/OurProducts'
import ContactUs from '../components/Home/ContactUs'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <div className=' flex flex-col'>
      <ScrollLabel />
      <Header />
      <HomeMobile1 />
      <div className='hidden md:block'>
        <ProductNavigator />
      </div>
      <div className=' hidden md:block'>
        <img src={image1} className=' w-full object-contain' />
      </div>
      <div>
        <img src={image2} className=' w-full object-contain hidden md:block' />
        <img src={image2mb} className=' w-full object-contain block md:hidden' />
      </div>
      <OurProducts />
      <div>
        <img src={brandLabellingImage} className=' w-full object-contain' />
      </div>
      <div className='block md:hidden'>
        <ProductNavigator />
      </div>
      <ContactUs />
      <Footer />
    </div>
  )
}

export default Home
