import React, { useState, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser'; // Updated to recommended package for browser
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactUs = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Added for custom field validations

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef(null);

  // Basic validation functions
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = t('validation_required', { field: t('home_contactus_name') });
    if (!email.trim()) {
      newErrors.email = t('validation_required', { field: t('home_contactus_Email') });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('validation_invalid_email');
    }
    if (!phoneno.trim()) newErrors.phoneno = t('validation_required', { field: t('home_contactus_Phone_Number') });
    if (!productDetails.trim()) newErrors.productDetails = t('validation_required', { field: t('home_contactus_Product_Details') });
    if (!message.trim()) newErrors.message = t('validation_required', { field: t('home_contactus_Your_Message') });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, phoneno, productDetails, message, t]);

  const handleCaptchaChange = useCallback((value) => {
    setCaptchaVerified(!!value); // Simplified: true if token exists, false otherwise
  }, []);

  const handleCaptchaExpired = useCallback(() => {
    setCaptchaVerified(false);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(t('validation_fix_errors'));
      return;
    }

    if (!captchaVerified) {
      toast.error(t('validation_captcha')); // Updated message to reflect single CAPTCHA
      return;
    }

    setLoading(true);

    emailjs
      .send(
        'service_tdazotg',
        'template_lk9b1qd',
        {
          from_name: name,
          from_email: email,
          phone: phoneno,
          product_details: productDetails,
          message: message,
          to_email: 'info@brandlabelling.de',
        },
        'mq1VG-mzLO5X7c3wM'
      )
      .then(
        () => {
          toast.success(t('message_sent'));
          setName('');
          setEmail('');
          setPhoneno('');
          setProductDetails('');
          setMessage('');
          setErrors({});
          recaptchaRef.current?.reset();
          setCaptchaVerified(false);
        },
        (error) => {
          console.error('EmailJS error:', error); // Added logging for debugging
          toast.error(t('message_failed'));
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [name, email, phoneno, productDetails, message, captchaVerified, validateForm, t]);

  return (
    <div className="flex flex-col justify-center items-center px-[16px] py-[60px] md:py-[130px]">
      <div className="flex justify-center items-center text-center text-[20px] md:text-[64px] font-[800] pb-[30px]">
        {t('home_contactus_CONTACT_US')}
      </div>
      <div className="flex justify-center items-center bg-[#D9D9D9] rounded-2xl w-full md:w-[700px]">
        <form className="flex flex-col gap-4 p-[20px] md:p-[50px] w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t('home_contactus_name')}</label>
            <input
              className={`bg-white px-[6px] py-[10px] text-[14px] rounded-[6px] ${errors.name ? 'border-red-500 border-2' : ''}`}
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-[12px]">{errors.name}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t('home_contactus_Email')}</label>
            <input
              className={`bg-white px-[6px] py-[10px] text-[14px] rounded-[6px] ${errors.email ? 'border-red-500 border-2' : ''}`}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-[12px]">{errors.email}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t('home_contactus_Phone_Number')}</label>
            <input
              className={`bg-white px-[6px] py-[10px] text-[14px] rounded-[6px] ${errors.phoneno ? 'border-red-500 border-2' : ''}`}
              type="text"
              name="phoneno"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
            />
            {errors.phoneno && <p className="text-red-500 text-[12px]">{errors.phoneno}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t('home_contactus_Product_Details')}</label>
            <input
              className={`bg-white px-[6px] py-[10px] text-[14px] rounded-[6px] ${errors.productDetails ? 'border-red-500 border-2' : ''}`}
              type="text"
              name="productDetails"
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
            />
            {errors.productDetails && <p className="text-red-500 text-[12px]">{errors.productDetails}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t('home_contactus_Your_Message')}</label>
            <textarea
              className={`bg-white p-[4px] text-[14px] rounded-[6px] min-h-[150px] ${errors.message ? 'border-red-500 border-2' : ''}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && <p className="text-red-500 text-[12px]">{errors.message}</p>}
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
              onExpired={handleCaptchaExpired} // Added to handle expiration
            />
          </div>

          <div className="flex justify-center items-center pt-[10px] md:pt-[20px]">
            <button
              type="submit"
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
  );
};

export default ContactUs;