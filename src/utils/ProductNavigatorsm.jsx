import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productNavigatorImage from '../assets/home/homebg11.jpg'

import bag from '../assets/home/popImages/bag.jpg'
import benies from '../assets/home/popImages/benies.jpg'
import cap from '../assets/home/popImages/cap.jpg'
import pant from '../assets/home/popImages/pant.jpg'
import shirt from '../assets/home/popImages/shirt.jpg'
import tshirt from '../assets/home/popImages/tshirt.jpg'
import socks from '../assets/home/popImages/socks.jpg'

const dots = [
    { top: '6%', left: '18%', title: 'Benies', image: benies, redirectUrl: 'benies' },
    { top: '26%', left: '45%', title: 'T-Shirt', image: tshirt, redirectUrl: 'tshirt' },
    { top: '18%', left: '76%', title: 'Bag', image: bag, redirectUrl: 'bag' },
    { top: '25%', left: '87%', title: 'Shirt', image: shirt, redirectUrl: 'shirt' },
    { top: '66%', left: '12%', title: 'Socks', image: socks, redirectUrl: 'socks' },
    { top: '66%', left: '44%', title: 'Pant', image: pant, redirectUrl: 'pant' },
    { top: '76%', left: '80%', title: 'Cap', image: cap, redirectUrl: 'cap' }
]

const ProductNavigatorsm = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const navigate = useNavigate()

  return (
    <div className='w-full relative'>
      <img src={productNavigatorImage} className='w-full object-cover' />
      {dots.map((dot, idx) => (
        <div
          key={idx}
          className="absolute cursor-pointer"
          style={{ top: dot.top, left: dot.left, transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          onClick={() => navigate(`/productDetails/${dot.redirectUrl}`)}
        >
            {/* Middle white */}
            <span className="block w-4 h-4 bg-white rounded-full flex items-center justify-center border-2 border-black">
                {/* Center black */}
                <span className="block w-2 h-2 bg-black rounded-full"></span>
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

export default ProductNavigatorsm