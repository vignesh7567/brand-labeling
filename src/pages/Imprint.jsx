import React from 'react'
import Legal from '../components/Imprint/Legal'
import Contact from '../components/Imprint/Contact'
import Register from '../components/Imprint/Register'
import Vat from '../components/Imprint/Vat'
import Disclaimer from '../components/Imprint/Disclaimer'
import impringbgImg from '../assets/imprint/topImg.jpg'
import Footer from '../components/Footer/Footer'

const Imprint = () => {
  return (
    <div className=' text-[14px] md:text-[32px]'>
      <div className=' w-full px-[10px] md:px-[30px] py-[30px] md:py-[90px]'>
        <img src={impringbgImg} className=' w-full object-contain' />
      </div>
      <Legal />
      <Contact />
      <Register />
      <Vat />
      <Disclaimer />
      <Footer />
    </div>
  )
}

export default Imprint
