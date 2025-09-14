import React from 'react'
import { useTranslation } from 'react-i18next';

const Disclaimer = () => {
  const { t } = useTranslation();
  return (
    <div className=' pt-[10px] md:pt-[30px] pb-[60px] md:pb-[90px]  px-[10px] md:px-[30px] text-center'>
      <p className=' text-[#00A3DC] text-[16px] md:text-[34px] font-[700]'>{t('imprint_disclaimer_disclaimer')}</p>
      <p className=' font-[500] py-[10px] md:py-[26px]'>{t('imprint_disclaimer_accountability')}</p>
      <p>{t('imprint_disclaimer_contents')}</p>
    </div>
  )
}

export default Disclaimer
