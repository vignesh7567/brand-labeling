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

const TOTAL_IMAGES = 5;

const Home = () => {
  const [loadedImages, setLoadedImages] = useState(0);

  // Handler for all images
  const handleImageLoad = () => setLoadedImages(count => count + 1);

  return (
    <div className=' flex flex-col'>
      {loadedImages < TOTAL_IMAGES && (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-white z-50 fixed top-0 left-0">
          {/* Hanger SVG spinning */}
          <svg
            className="animate-spin-slow mb-6 drop-shadow-lg"
            width="80"
            height="80"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "#2563eb" }} // Tailwind blue-600
          >
            <path
              d="M32 8C32 13 40 13 40 18C40 21.5 36 22 32 28"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M32 28L12 52H52L32 28Z"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="32"
              cy="8"
              r="3"
              fill="currentColor"
            />
          </svg>
          <div className="text-xl font-semibold text-blue-600 tracking-wide mb-2 animate-pulse">
            Loading Your Style...
          </div>
          <div className="text-blue-400 text-sm">Please wait while we dress up your experience</div>
          <style>
            {`
              .animate-spin-slow {
                animation: spin 1.8s linear infinite;
              }
              @keyframes spin {
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}
      <ScrollLabel />
      <Header />
      <HomeMobile1 onImageLoad={handleImageLoad} />
      <div className='hidden md:block'>
        <ProductNavigator onImageLoad={handleImageLoad} />
      </div>
      <div className=' hidden md:block'>
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
      <div className='block md:hidden pt-[36px]'>
        <ProductNavigatorsm />
      </div>
      <ContactUs />
      <Footer />
    </div>
  )
}

export default Home
