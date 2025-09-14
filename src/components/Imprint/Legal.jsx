import React from 'react'
import { useTranslation } from 'react-i18next';

const Legal = () => {
  const { t } = useTranslation();
  return (
    <div className=' py-[10px] md:py-[30px]  px-[10px] md:px-[30px] text-center'>
      <p className=' text-[#00A3DC] text-[16px] md:text-[34px] font-[700]'>{t('imprint_legal_Legal_Disclosure')}</p>
      <p className=' py-[12px] md:py-[28px]'>{t('imprint_legal_info')}</p>
      <p className=' font-[500]'>{t('imprint_legal_reena')}</p>
      <p><span className=' font-[500]'>{t('imprint_legal_Company_name')}</span> {t('imprint_legal_SHAKTHISHIVAM_UG')}</p>
      <p><span className=' font-[500]'>{t('imprint_legal_Address')}</span> {t('imprint_legal_addr')}</p>
    </div>
  )
}

export default Legal
