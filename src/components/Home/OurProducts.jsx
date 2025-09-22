import React from 'react'
import backPackImage from '../../assets/ourProducts/backpack1.png'
import tShirtImage from '../../assets/ourProducts/tshirt.jpg'
import benCap from '../../assets/ourProducts/bencap1.png'
import caps from '../../assets/ourProducts/caps1.png'
import cargos from '../../assets/ourProducts/cargos.jpg'
import shirt from '../../assets/ourProducts/shirt1.png'
import socks from '../../assets/ourProducts/socks.jpg'
import { useTranslation } from 'react-i18next';

const OurProducts = () => {
    const { t } = useTranslation();
  return (
    <div className=' flex flex-col items-center justify-center px-[13px] py-[36px] md:py-[130px]'>
      <div className=' text-[20px] md:text-[64px] font-[800] pb-[20px] md:pb-[80px]'>{t('home_ourproducts_OURPRODUCTS')}</div>
      <div className=' hidden md:flex flex-col gap-4'>
        <div className=' flex gap-4'>
            <div><img src={backPackImage} className=' object-contain' /></div>
            <div><img src={caps} className=' object-contain' /></div>
        </div>
        <div className=' flex gap-4'>
            <div className=' flex gap-3'>
                <div><img src={cargos} className=' object-contain' /></div>
                <div><img src={tShirtImage} className=' object-contain' /></div>
            </div>
            <div className=' flex flex-col gap-4'>
                <img src={socks} className=' object-contain' />
                <img src={shirt} className=' object-contain' />
                <img src={benCap} className=' object-contain' />
            </div>
        </div>
      </div>
      <div className=' flex md:hidden flex-col gap-4'>
        <div className=' flex flex-col gap-2'>
            <img src={socks} />
            <img src={shirt} />
            <img src={benCap} />
        </div>
        <div className=' flex gap-2 '>
            <div className=''>
                <img src={backPackImage} className=' h-auto object-contain' />
            </div>
            <div className=''>
                <img src={caps} className=' h-auto object-contain' />
            </div>
        </div>
        <div className=' flex gap-2'>
            <div>
                <img src={cargos} className=' h-auto object-contain' />
            </div>
            <div>
                <img src={tShirtImage} className=' h-auto object-contain' />
            </div>
        </div>
      </div>
    </div>
  )
}

export default OurProducts
