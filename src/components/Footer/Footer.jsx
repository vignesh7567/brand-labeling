import React from 'react'
import { FaTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import logo from '../../assets/logo/logo.jpg'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='bg-[#0081AE] text-white flex flex-col px-[20px] md:px-[40px] py-[20px] md:py-[50px] gap-[80px] md:gap-[150px]'>
        <div className=' flex flex-col md:flex-row flex-wrap justify-between gap-6 md:gap-2'>
            <div className='flex flex-col gap-2 '>
                <div>
                    <img src={logo} className=' w-[140px] md:w-full object-contain' />
                </div>
                <div className=' flex gap-4 text-[28px] md:text-[40px]'>
                    <Link target='_blank' to="https://www.instagram.com/brand.labellingde/?igsh=ZmJkOWNrN2hkcm5o&utm_source=qr#" className=' cursor-pointer'><FaInstagram /></Link>
                    <Link target='_blank' className=' cursor-pointer'><FaFacebookSquare /></Link>
                    <Link target='_blank' className=' cursor-pointer'><FaTwitter /></Link>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className=' text-[16px] md:text-[24px] font-[600]'>ADDRESS</div>
                <div className=' flex gap-2 text-[14px] md:text-[20px]'>
                    <div className=' pt-1.5'><FaLocationDot /></div>
                    <div className=' w-[340px]'>18, Admiral-Scheer-Str, Essen, North Rhine - Westphalia (NRW), 45128, Germany</div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className=' text-[16px] md:text-[24px] font-[600]'>COMPANY</div>
                <div className=' flex flex-col gap-2 text-[14px] md:text-[20px]'>
                    <Link className=' cursor-pointer'>About Us</Link>
                    <Link to="imprint" className=' cursor-pointer'>Imprint</Link>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className=' text-[16px] md:text-[24px] font-[600]'>CONTACT US</div>
                <div className=' flex flex-col gap-2 text-[14px] md:text-[20px]'>
                    <p>Email id: info@brandlabelling.de</p>
                    <p>Phone No:+49 15214149340</p>
                </div>
            </div>
        </div>
        <div className=' flex text-center justify-center items-center gap-2 text-[14px] md:text-[20px]'>
            <p>Powered By Katana</p>
            <FaRegCopyright />
        </div>
    </div>
  )
}

export default Footer
