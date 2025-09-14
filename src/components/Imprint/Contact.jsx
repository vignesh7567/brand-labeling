import React from 'react'
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className=' py-[10px] md:py-[30px]  px-[10px] md:px-[30px] text-center'>
      <p className=' text-[#00A3DC] text-[16px] md:text-[34px] font-[700]'>{t('imprint_contact_contact_info')}</p>
      <p className=' font-[500] pt-[10px] md:pt-[26px]'>{t('imprint_contact_internet')}</p>
      <p className=' font-[500]'>{t('imprint_contact_email')}</p>
    </div>
  )
}

export default Contact
