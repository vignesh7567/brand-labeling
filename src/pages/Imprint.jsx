import React from 'react'
import Legal from '../components/Imprint/Legal'
import Contact from '../components/Imprint/Contact'
import Register from '../components/Imprint/Register'
import Vat from '../components/Imprint/Vat'
import Disclaimer from '../components/Imprint/Disclaimer'
import impringbgImg from '../assets/imprint/topImg.jpg'

const Imprint = () => {
  return (
    <div className=' text-[32px] text-center'>
      <div>
        <img src={impringbgImg} className=' w-full object-contain' />
      </div>
      <Legal />
      <Contact />
      <Register />
      <Vat />
      <Disclaimer />
    </div>
  )
}

export default Imprint
