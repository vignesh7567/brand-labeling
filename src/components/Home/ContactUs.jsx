// ContactUs.jsx
import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser"; // recommended over emailjs-com
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;        // e.g. "service_xxx"
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;      // e.g. "template_xxx"
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;        // EmailJS public key / user id
const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;     // reCAPTCHA site key

const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^[0-9+\-\s()]{7,20}$/; // permissive phone validator

const ContactUs = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  // Init EmailJS client if PUBLIC_KEY is provided
  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (err) {
        // emailjs.init may throw if called twice in some environments — safe to catch
        /* ignore */
      }
    }
  }, []);

  // Basic client-side validation
  const validateFields = () => {
    if (!name.trim()) {
      toast.error(t ? t("home_contactus_name_required") : "Please enter your name");
      return false;
    }
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error(t ? t("home_contactus_valid_email") : "Please enter a valid email address");
      return false;
    }
    if (!phoneno.trim() || !phoneRegex.test(phoneno)) {
      toast.error(t ? t("home_contactus_valid_phone") : "Please enter a valid phone number");
      return false;
    }
    if (!productDetails.trim()) {
      toast.error(t ? t("home_contactus_product_details_required") : "Please enter product details");
      return false;
    }
    if (!message.trim()) {
      toast.error(t ? t("home_contactus_message_required") : "Please enter a message");
      return false;
    }
    if (!captchaToken) {
      toast.error(t ? t("home_contactus_complete_captcha") : "Please complete the CAPTCHA.");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneno("");
    setProductDetails("");
    setMessage("");
    if (recaptchaRef.current) {
      try {
        recaptchaRef.current.reset();
      } catch (err) {
        // some versions may require checking
      }
    }
    setCaptchaToken(null);
  };

  const handleCaptchaChange = (token) => {
    // token is the reCAPTCHA response string — keep it (you may want to verify server-side)
    setCaptchaToken(token || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (!validateFields()) return;

    setLoading(true);

    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phoneno,
      product_details: productDetails,
      message,
      // include captcha token if your EmailJS template or backend expects it:
      recaptcha_token: captchaToken,
      // optional: if your template uses to_email variable:
      to_email: "info@brandlabelling.de"
    };

    try {
      // If PUBLIC_KEY wasn't init'd above, you can pass PUBLIC_KEY as 4th arg:
      const sendArgs = [SERVICE_ID, TEMPLATE_ID, templateParams];
      if (PUBLIC_KEY) {
        // emailjs.send works either with init(PUBLIC_KEY) called or by passing public key as 4th param
        await emailjs.send(...sendArgs);
      } else {
        // fallback: pass public key as last arg (if available)
        await emailjs.send(...sendArgs, PUBLIC_KEY);
      }

      toast.success(t ? t("home_contactus_message_sent") : "Message sent!");
      resetForm();
    } catch (err) {
      // network or service error — log so you can inspect in devtools
      console.error("EmailJS send error:", err);
      // inspect err.status or err.text if available
      toast.error(t ? t("home_contactus_send_failed") : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  // UI: show a friendly warning if env keys are not present (helps debug)
  const missingConfig = !SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !RECAPTCHA_KEY;

  return (
    <div className="flex flex-col justify-center items-center px-[16px] py-[60px] md:py-[130px]">
      <div className="flex justify-center items-center text-center text-[20px] md:text-[64px] font-[800] pb-[30px]">
        {t("home_contactus_CONTACT_US")}
      </div>
      
      <div className="flex justify-center items-center bg-[#D9D9D9] rounded-2xl w-full md:w-[700px]">
        <form className="flex flex-col gap-4 p-[20px] md:p-[50px] w-full" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t("home_contactus_name")}</label>
            <input
              className="bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]"
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-required="true"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t("home_contactus_Email")}</label>
            <input
              className="bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t("home_contactus_Phone_Number")}</label>
            <input
              className="bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]"
              type="tel"
              name="phoneno"
              required
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              aria-required="true"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t("home_contactus_Product_Details")}</label>
            <input
              className="bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]"
              type="text"
              name="productDetails"
              required
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              aria-required="true"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t("home_contactus_Your_Message")}</label>
            <textarea
              className="bg-white p-[4px] text-[14px] rounded-[6px] min-h-[150px]"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-required="true"
            />
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_KEY}
              onChange={handleCaptchaChange}
            />
          </div>

          <div className="flex justify-center items-center pt-[10px] md:pt-[20px]">
            <button
              type="submit"
              className={`bg-[#0081AE] text-white w-full md:w-[80%] py-[8px] md:py-[16px] rounded-xl transition duration-300 
                ${(loading || !captchaToken) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={loading || !captchaToken}
              aria-disabled={loading || !captchaToken}
            >
              {loading ? t("home_contactus_sending") : t("home_contactus_Send_Message")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
