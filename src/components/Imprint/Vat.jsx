import React from 'react'
import { useTranslation } from 'react-i18next';

const Vat = () => {
  const { t } = useTranslation();
  return (
    <div className=' py-[10px] md:py-[30px]  px-[10px] md:px-[30px] text-center'>
      <p className=' text-[#00A3DC] text-[16px] md:text-[34px] font-[700]'>{t('imprint_vat_vat_num')}</p>
      <p className=' pt-[10px] md:pt-[26px]'>{t('imprint_vat_vat_num_id')}</p>
      <p>{t('imprint_vat_vat_num_the')} <span className=' font-[500]'>{t('imprint_vat_vat_num_de')}</span></p>
    </div>
  )
}

export default Vat
