import React, { useState, useRef } from 'react'
import emailjs from 'emailjs-com'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from "react-google-recaptcha";

const ContactUs = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef(null);

  const handleCaptchaChange = (value) => {
    // console.log("Captcha value:", value);
    if (value) {
      setCaptchaVerified(true);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      "service_tdazotg",
      "template_lk9b1qd",
      {
        from_name: name,
        from_email: email,
        phone: phoneno,
        product_details: productDetails,
        message: message,
      },
      "mq1VG-mzLO5X7c3wM"
    )
    .then(() => {
      toast.success("Message sent!");
      setLoading(false);
      setName('');
      setEmail('');
      setPhoneno('');
      setProductDetails('');
      setMessage('');
    })
    .catch(() => {
      toast.error("Failed to send message.");
      setLoading(false);
    });
  };

  return (
    <div className='flex flex-col justify-center items-center px-[16px] py-[60px] md:py-[130px]'>
      <div className='flex justify-center items-center text-center text-[20px] md:text-[64px] font-[800] pb-[30px]'>{t('home_contactus_CONTACT_US')}</div>
      <div className='flex justify-center items-center bg-[#D9D9D9] rounded-2xl w-full md:w-[700px]'>
        <form className='flex flex-col gap-4 p-[20px] md:p-[50px] w-full' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label className='text-[16px] md:text-[20px] font-[500]'>{t('home_contactus_name')}</label>
            <input className='bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]' type="text" name="name" required value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[16px] md:text-[20px] font-[500]'>{t('home_contactus_Email')}</label>
            <input className='bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]' type="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[16px] md:text-[20px] font-[500]'>{t('home_contactus_Phone_Number')}</label>
            <input className='bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]' type="text" name="phoneno" required value={phoneno} onChange={e => setPhoneno(e.target.value)} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[16px] md:text-[20px] font-[500]'>{t('home_contactus_Product_Details')}</label>
            <input className='bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]' type="text" name="productDetails" required value={productDetails} onChange={e => setProductDetails(e.target.value)} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[16px] md:text-[20px] font-[500]'>{t('home_contactus_Your_Message')}</label>
            <textarea className='bg-white p-[4px] text-[14px] rounded-[6px] min-h-[150px]' required value={message} onChange={e => setMessage(e.target.value)} />
          </div>
          <div className='flex justify-center'>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfBuNErAAAAAPr-9vu4x6iYZK_QIkk3JyiuHO06"
              onChange={handleCaptchaChange}
            />
          </div>

          <div className='flex justify-center items-center pt-[10px] md:pt-[20px]'>
            <button
              type='submit'
              className={`bg-[#0081AE] text-white w-full md:w-[80%] py-[8px] md:py-[16px] rounded-xl transition duration-300 
                ${(!captchaVerified || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={!captchaVerified || loading}
            >
              {loading ? t('home_contactus_sending') : t('home_contactus_Send_Message')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
