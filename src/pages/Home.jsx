import React, { useState } from 'react'
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
import ProductNavigatorsm from '../utils/ProductNavigatorsm'

const TOTAL_IMAGES = 4;

const Home = () => {
  const [loadedImages, setLoadedImages] = useState(0);

  // Handler for all images
  const handleImageLoad = () => setLoadedImages(count => count + 1);
  console.log(loadedImages, TOTAL_IMAGES);
  
  return (
    <div className=' flex flex-col'>
      {loadedImages < TOTAL_IMAGES && (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-white z-50 fixed top-0 left-0">
          {/* Animated clothes tags */}
          <div className="flex gap-3 mb-6">
            <div className="w-5 h-10 bg-blue-500 rounded-md animate-bounce [animation-delay:0ms] shadow-lg"></div>
            <div className="w-5 h-10 bg-blue-400 rounded-md animate-bounce [animation-delay:200ms] shadow-lg"></div>
            <div className="w-5 h-10 bg-blue-300 rounded-md animate-bounce [animation-delay:400ms] shadow-lg"></div>
          </div>
          <div className="text-xl font-semibold text-blue-500 tracking-wide mb-2 animate-pulse">
            Dressing up your experience...
          </div>
          <div className="text-blue-400 text-sm">Please wait while we prepare your style</div>
          <style>
            {`
              .animate-bounce {
                animation: bounce 1.2s infinite;
              }
              @keyframes bounce {
                0%, 100% { transform: translateY(0);}
                50% { transform: translateY(-24px);}
              }
              .[animation-delay\\:200ms] { animation-delay: 0.2s; }
              .[animation-delay\\:400ms] { animation-delay: 0.4s; }
            `}
          </style>
        </div>
      )}
      <ScrollLabel />
      <Header />
      <div className='block md:hidden'>
        <ProductNavigatorsm />
      </div>
      <div className='hidden md:block'>
        <ProductNavigator onImageLoad={handleImageLoad} />
      </div>
      <div className='block'>
        <img src={image1} className=' w-full object-contain' onLoad={handleImageLoad} />
      </div>
      <div>
        <img src={image2} className=' w-full object-contain hidden md:block' onLoad={handleImageLoad} />
        <img src={image2mb} className=' w-full object-contain block md:hidden' onLoad={handleImageLoad} />
      </div>
      <OurProducts />
      <div>
        <img src={brandLabellingImage} className=' w-full object-contain' />
      </div>
      <ContactUs />
      <Footer />
    </div>
  )
}

export default Home
