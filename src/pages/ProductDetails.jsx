import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import products from '../utils/product.json';
import ProductImages from '../components/ProductDetails/ProductImages';
import ProductContent from '../components/ProductDetails/ProductContent';
import bgImg from '../assets/productDetails/noisybackground.jpg';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products[id];  

  // Loader state
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    setLoadedImages(new Set());
    setLoading(true);
  }, [id]);

  useEffect(() => {
    if (product && product.image && loadedImages.size === product.image.length) {
      setLoading(false);
    }
  }, [loadedImages, product]);

  const handleImageLoad = (imgName) => {
    setLoadedImages(prev => {
      const next = new Set(prev);
      next.add(imgName);
      return next;
    });
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <svg
          className="mb-6 text-blue-500"
          width="80"
          height="80"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="30" stroke="#2563eb" strokeWidth="4" fill="#fff" />
          <path d="M24 28L32 36L40 28" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 36V20" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <div className="text-2xl font-bold text-blue-700 mb-2">Product Not Found</div>
        <div className="text-blue-500 mb-6">Sorry, the product you are looking for does not exist.</div>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Pass onImageLoad to ProductImages
  return (
    <div className="relative h-screen min-h-screen overflow-hidden">
      {/* Background overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
        }}
      />

      {/* Loader Overlay */}
      {loading && (
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
      {/* Content */}
      <div className='relative z-10 h-[100%] flex flex-col gap-5 p-4 overflow-auto'>
        <div className="flex justify-between items-center">
          <div className='flex items-center gap-1 cursor-pointer border-1 border-gray-400 p-1 rounded-sm' onClick={() => navigate('/')}><IoMdArrowRoundBack /> Return to Home</div>
        </div>
        <div className="pb-5 md:h-full flex flex-col md:flex-row gap-7 md:gap-[15%] justify-center items-center">
          <ProductImages images={product.image} onImageLoad={handleImageLoad}/>
          <ProductContent product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;