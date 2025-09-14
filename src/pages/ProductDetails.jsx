import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import ProductImages from '../components/ProductDetails/ProductImages';
import ProductContent from '../components/ProductDetails/ProductContent';
import bgImg from '../assets/productDetails/noisybackground.jpg';
import { useTranslation } from 'react-i18next';

const ProductDetails = () => {
  const { t } = useTranslation(['translation', 'product']);

  const { id } = useParams();
  const navigate = useNavigate();

  const product = t(id, { ns: 'product', returnObjects: true });  

  // Loader state
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    setLoadedImages(new Set());
    setLoading(true);
  }, [id]);

  useEffect(() => {
    console.log(loadedImages.size, product.image.length);
    
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
        <div className="text-2xl font-bold text-blue-700 mb-2">{t('pages_productdetails_product')}</div>
        <div className="text-blue-500 mb-6">{t('pages_productdetails_the_product')}</div>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
         {t('pages_productdetails_the_return')}
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
          {/* Animated clothes tags */}
          <div className="flex gap-3 mb-6">
            <div className="w-5 h-10 bg-blue-500 rounded-md animate-bounce [animation-delay:0ms] shadow-lg"></div>
            <div className="w-5 h-10 bg-blue-400 rounded-md animate-bounce [animation-delay:200ms] shadow-lg"></div>
            <div className="w-5 h-10 bg-blue-300 rounded-md animate-bounce [animation-delay:400ms] shadow-lg"></div>
          </div>
          <div className="text-xl font-semibold text-blue-500 tracking-wide mb-2 animate-pulse">
            {t('pages_productdetails_the_dressing')}
          </div>
          <div className="text-blue-400 text-sm">{t('pages_productdetails_the_wait')}</div>
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
      {/* Content */}
      <div className='relative z-10 h-[100%] flex flex-col gap-5 p-4 overflow-auto'>
        <div className="flex justify-between items-center">
          <div className='flex items-center gap-1 cursor-pointer border-1 border-gray-400 p-1 rounded-sm' onClick={() => navigate('/')}><IoMdArrowRoundBack /> {t('pages_productdetails_the_return')}</div>
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