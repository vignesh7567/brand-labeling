import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import products from '../utils/product.json';
import ProductImages from '../components/ProductDetails/ProductImages';
import ProductContent from '../components/ProductDetails/ProductContent';
import bgImg from '../assets/productDetails/noisybackground.jpg';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product by id (id is string, product.id is number)
  const product = products[id];  

  if (!product) return <div>Product not found.</div>;

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
    {/* Content */}
    <div className='relative z-10 h-[100%] flex flex-col gap-5 p-4 overflow-auto'>
        <div className="flex justify-between items-center">
            <div className=' flex items-center gap-1 cursor-pointer border-1 border-gray-400 p-1 rounded-sm' onClick={() => navigate('/')}><IoMdArrowRoundBack /> Return to Home</div>
        </div>
        <div className=" pb-5  md:h-full flex flex-col md:flex-row gap-7 md:gap-[15%] justify-center items-center">
            <ProductImages images={product.image} />
            <ProductContent product={product} />
        </div>
    </div>
  </div>
);
};

export default ProductDetails;
