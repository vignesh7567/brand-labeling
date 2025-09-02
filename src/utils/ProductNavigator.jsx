import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productNavigatorImage from '../assets/home/homebg111.jpg'

import bag from '../assets/home/popImages/bag.jpg'
import benies from '../assets/home/popImages/benies1.jpg'
import cap from '../assets/home/popImages/cap.jpg'
import pant from '../assets/home/popImages/pant.jpg'
import shirt from '../assets/home/popImages/shirt.jpg'
import tshirt from '../assets/home/popImages/tshirt1.jpg'
import socks from '../assets/home/popImages/socks1.jpg'
import polotshirt from '../assets/home/popImages/polotshirt.png'

const dots = [
  { top: '8.7%', left: '12.6%', title: 'Cap', image: cap, redirectUrl: 'cap' },
  { top: '25.5%', left: '36.5%', title: 'T-Shirt', image: tshirt, redirectUrl: 'tshirt' },
  { top: '10%', left: '63.5%', title: 'Benies', image: benies, redirectUrl: 'benies' },
  { top: '26.6%', left: '89%', title: 'Pant', image: pant, redirectUrl: 'pant' },
  { top: '78.5%', left: '17.4%', title: 'Socks', image: socks, redirectUrl: 'socks' },
  { top: '74.5%', left: '47.15%', title: 'Bag', image: bag, redirectUrl: 'bag' },
  { top: '73.35%', left: '64.45%', title: 'Shirt', image: shirt, redirectUrl: 'shirt' },
  { top: '71.1%', left: '88.73%', title: 'Polo T-Shirt', image: polotshirt, redirectUrl: 'polo' },
]

const ProductNavigator = ({onImageLoad}) => {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const navigate = useNavigate()

  return (
    <div className='w-full relative'>
      <img src={productNavigatorImage} className='w-full object-cover' onLoad={onImageLoad} />
      {dots.map((dot, idx) => (
        <div
          key={idx}
          className="absolute cursor-pointer"
          style={{ top: dot.top, left: dot.left, transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          onClick={() => navigate(`/productDetails/${dot.redirectUrl}`)}
        >
          {/* Outer black */}
          <span className="block w-4.5 md:w-13 h-4.5 md:h-13 bg-black rounded-full flex items-center justify-center">
            {/* Middle white */}
            <span className="block w-4 md:w-12 h-4 md:h-12 bg-white rounded-full flex items-center justify-center border-2 border-black">
              {/* Center black */}
              <span className="block w-2 md:w-7 h-2 md:h-7 bg-black rounded-full"></span>
            </span>
          </span>
          {/* Tooltip */}
          {hoveredIdx === idx && (
            <div
              className={`absolute ${idx === 3 || idx === 7 ? 'right-0' : 'left-0'} top-0 z-10 bg-white border border-gray-300 rounded shadow-lg flex flex-col items-center gap-2 min-w-[150px] p-2`}
            >
              <img src={dot.image} alt={dot.title} className="w-full object-cover rounded" />
              <span className="font-semibold text-sm text-center">{dot.title}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProductNavigator