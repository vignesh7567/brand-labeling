import React from 'react'
import image1mb from '../../assets/home/homebg1mb.jpg'

const HomeMobile1 = () => {
  return (
    <div className='w-full block md:hidden relative'>
      <img src={image1mb} className='w-full object-contain' />
      <div className='absolute left-8 top-1/2 flex flex-col items-center bg-opacity-40'>
        <p className='text-white text-[13px] font-[800]'>Create and sell print-on-</p>
        <p className='text-[#065975] text-[13px] font-[800]'>demand products</p>
        <button className=' text-white mt-[13px] bg-black text-[10px] font-[600] px-[28px] py-[4px] rounded-2xl'>Get Start</button>
      </div>
    </div>
  )
}

export default HomeMobile1