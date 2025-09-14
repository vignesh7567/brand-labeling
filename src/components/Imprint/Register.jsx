import React from 'react'
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  return (
    <div className=' py-[10px] md:py-[30px]  px-[10px] md:px-[30px] text-center'>
      <p className=' text-[#00A3DC] text-[16px] md:text-[34px] font-[700]'>{t('imprint_register_Register_entry')}</p>
      <p className=' pt-[10px] md:pt-[26px]'><span className=' font-[500]'>{t('imprint_register_Entry_in')}</span> {t('imprint_register_Handelsregister_IHK')}</p>
      <p><span className=' font-[500]'>{t('imprint_register_Register_Number')}</span> {t('imprint_register_HRA_31643')}</p>
      <p><span className=' font-[500]'>{t('imprint_register_Register_Court')}</span> {t('imprint_register_Essen')}</p>
    </div>
  )
}

export default Register
