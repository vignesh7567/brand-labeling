import React from 'react'
import image1mb from '../../assets/home/homebg1mb.jpg'
import { useTranslation } from 'react-i18next';

const HomeMobile1 = ({onImageLoad}) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className='w-full block md:hidden relative'>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('de')}>Deutsch</button>
      <img src={image1mb} className='w-full object-contain' onLoad={onImageLoad} />
      <div className='absolute left-8 top-1/2 flex flex-col items-center bg-opacity-40'>
        <p className='text-white text-[13px] font-[800]'>{t('home_homemobile_create_sell')}</p>
        <p className='text-[#065975] text-[13px] font-[800]'>{t('home_homemobile_demand_products')}</p>
        <button className=' text-white mt-[13px] bg-black text-[10px] font-[600] px-[28px] py-[4px] rounded-2xl'>{t('home_homemobile_get_start')}</button>
      </div>
    </div>
  )
}

export default HomeMobile1