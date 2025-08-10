import React from 'react'
import logo from '../../assets/logo/logo.jpg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className=' bg-black text-white flex px-[10px] md:px-[20px] py-[8px] md:py-[16px]  items-center justify-between'>
      <div className=' h-[36px] md:h-[50px] rounded-[2px] md:rounded-[6px] overflow-hidden'>
        <img src={logo} className=' h-[36px] md:h-[50px]'></img>
      </div>
      <div className=' flex gap-[20px] md:gap-[24px] text-[14px] md:text-[19px]'>
        <Link className=' cursor-pointer'>Style</Link>
        <Link className=' cursor-pointer'>Gender</Link>
        <Link className=' cursor-pointer'>Fabric</Link>
        <Link className=' cursor-pointer'>Composition</Link>
        <Link className=' cursor-pointer'>Filters</Link>
      </div>
    </div>
  )
}

export default Header
