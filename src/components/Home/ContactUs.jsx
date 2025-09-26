// ContactUs.jsx
import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const emailRegex = /^\S+@\S+\.\S+$/;
const minPhoneLength = 7; // adjust if necessary

export default function ContactUs() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // validation error states (empty string = no error)
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [productError, setProductError] = useState("");
  const [messageError, setMessageError] = useState("");

  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (e) {
        // safe to ignore if already initialized
      }
    }
  }, []);

  // Real-time validators
  const validateName = (val) => {
    if (!val.trim()) return t("home_contactus_name_required");
    if (val.trim().length < 2) return t("home_contactus_name_too_short");
    return "";
  };

  const validateEmail = (val) => {
    if (!val.trim()) return t("home_contactus_valid_email_required");
    if (!emailRegex.test(val)) return t("home_contactus_valid_email");
    return "";
  };

  // Phone accepts digits only for this UX; we will block non-digit keystrokes and show errors on paste
  const validatePhone = (val) => {
    if (!val.trim()) return t("home_contactus_phone_required");
    if (!/^\d+$/.test(val)) return t("home_contactus_phone_numbers_only");
    if (val.trim().length < minPhoneLength) return `Phone must be at least ${minPhoneLength} digits`;
    return "";
  };

  const validateProduct = (val) => {
    if (!val.trim()) return t("home_contactus_product_details_required");
    return "";
  };

  const validateMessage = (val) => {
    if (!val.trim()) return t("home_contactus_message_required");
    if (val.trim().length < 10) return t("home_contactus_message_too_short");
    return "";
  };

  // handlers that validate on every change
  const onNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    setNameError(validateName(val));
  };

  const onEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setEmailError(validateEmail(val));
  };

  // For phone: prevent non-digit typing; still handle paste and set error
  const onPhoneChange = (e) => {
    const val = e.target.value;
    setPhoneno(val);
    setPhoneError(validatePhone(val));
  };

  const onPhoneKeyDown = (e) => {
    // allow control keys (backspace, arrows, etc.)
    const allowedKeys = [
      "Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab", "Home", "End"
    ];
    if (allowedKeys.includes(e.key)) return;
    // only allow digits
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onPhonePaste = (e) => {
    const pasted = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pasted)) {
      e.preventDefault();
      setPhoneError(t ? t("home_contactus_phone_numbers_only") : "Enter only numbers");
      // optionally show the cleaned version:
      const cleaned = pasted.replace(/\D+/g, "");
      if (cleaned) {
        // append cleaned digits to existing value
        const newVal = (phoneno + cleaned).replace(/\D+/g, "");
        setPhoneno(newVal);
        setPhoneError(validatePhone(newVal));
      }
    }
  };

  const onProductChange = (e) => {
    const val = e.target.value;
    setProductDetails(val);
    setProductError(validateProduct(val));
  };

  const onMessageChange = (e) => {
    const val = e.target.value;
    setMessage(val);
    setMessageError(validateMessage(val));
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token || null);
  };

  const anyErrors = () => {
    return (
      !!nameError ||
      !!emailError ||
      !!phoneError ||
      !!productError ||
      !!messageError
    );
  };

  const validateAllBeforeSubmit = () => {
    // ensure errors are recomputed once more (in case user never touched a field)
    const nErr = validateName(name);
    const eErr = validateEmail(email);
    const pErr = validatePhone(phoneno);
    const prodErr = validateProduct(productDetails);
    const mErr = validateMessage(message);

    setNameError(nErr);
    setEmailError(eErr);
    setPhoneError(pErr);
    setProductError(prodErr);
    setMessageError(mErr);

    return !(nErr || eErr || pErr || prodErr || mErr);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneno("");
    setProductDetails("");
    setMessage("");
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setProductError("");
    setMessageError("");
    if (recaptchaRef.current) {
      try { recaptchaRef.current.reset(); } catch (err) { /* ignore */ }
    }
    setCaptchaToken(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!captchaToken) {
      toast.error(t ? t("home_contactus_complete_captcha") : "Please complete the CAPTCHA.");
      return;
    }

    const ok = validateAllBeforeSubmit();
    if (!ok) {
      toast.error(t ? t("home_contactus_fix_errors") : "Please fix the errors before submitting.");
      // focus first field with error
      const firstErrorField = document.querySelector("[aria-invalid='true']");
      if (firstErrorField) firstErrorField.focus();
      return;
    }

    setLoading(true);
    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phoneno,
      product_details: productDetails,
      message,
      recaptcha_token: captchaToken,
      to_email: "info@brandlabelling.de",
    };

    try {
      if (PUBLIC_KEY) {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      } else {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      }
      toast.success(t ? t("home_contactus_message_sent") : "Message sent!");
      resetForm();
    } catch (err) {
      console.error("EmailJS send error:", err);
      toast.error(t ? t("home_contactus_send_failed") : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  // Simple styles for invalid inputs (Tailwind used in your project)
  const inputBaseClass = "bg-white px-[6px] py-[10px] text-[14px] rounded-[6px] outline-none";
  const invalidClass = "border border-red-500";

  return (
    <div className="flex flex-col justify-center items-center px-[16px] py-[60px] md:py-[130px]">
      <div className="flex justify-center items-center text-center text-[20px] md:text-[64px] font-[800] pb-[30px]">
        {t("home_contactus_CONTACT_US")}
      </div>

      <div className="flex justify-center items-center bg-[#D9D9D9] rounded-2xl w-full md:w-[700px]">
        <form className="flex flex-col gap-4 p-[20px] md:p-[50px] w-full" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t("home_contactus_name")}</label>
            <input
              className={`${inputBaseClass} ${nameError ? invalidClass : ""}`}
              type="text"
              name="name"
              value={name}
              onChange={onNameChange}
              aria-invalid={!!nameError}
              aria-describedby={nameError ? "name-error" : undefined}
              required
            />
            {nameError && <p id="name-error" className="text-red-600 text-sm mt-1">{nameError}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t("home_contactus_Email")}</label>
            <input
              className={`${inputBaseClass} ${emailError ? invalidClass : ""}`}
              type="email"
              name="email"
              value={email}
              onChange={onEmailChange}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
              required
            />
            {emailError && <p id="email-error" className="text-red-600 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t("home_contactus_Phone_Number")}</label>
            <input
              className={`${inputBaseClass} ${phoneError ? invalidClass : ""}`}
              type="tel"
              name="phoneno"
              inputMode="numeric"
              value={phoneno}
              onChange={onPhoneChange}
              onKeyDown={onPhoneKeyDown}
              onPaste={onPhonePaste}
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "phone-error" : undefined}
              required
            />
            {phoneError && <p id="phone-error" className="text-red-600 text-sm mt-1">{phoneError}</p>}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t("home_contactus_Product_Details")}</label>
            <input
              className={`${inputBaseClass} ${productError ? invalidClass : ""}`}
              type="text"
              name="productDetails"
              value={productDetails}
              onChange={onProductChange}
              aria-invalid={!!productError}
              aria-describedby={productError ? "product-error" : undefined}
              required
            />
            {productError && <p id="product-error" className="text-red-600 text-sm mt-1">{productError}</p>}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] md:text-[20px] font-[500]">{t("home_contactus_Your_Message")}</label>
            <textarea
              className={`${inputBaseClass} ${messageError ? invalidClass : ""} p-[4px] min-h-[150px]`}
              value={message}
              onChange={onMessageChange}
              aria-invalid={!!messageError}
              aria-describedby={messageError ? "message-error" : undefined}
              required
            />
            {messageError && <p id="message-error" className="text-red-600 text-sm mt-1">{messageError}</p>}
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_KEY}
              onChange={handleCaptchaChange}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center items-center pt-[10px] md:pt-[20px]">
            <button
              type="submit"
              className={`bg-[#0081AE] text-white w-full md:w-[80%] py-[8px] md:py-[16px] rounded-xl transition duration-300 
                ${(loading || anyErrors() || !captchaToken) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={loading || anyErrors() || !captchaToken}
              aria-disabled={loading || anyErrors() || !captchaToken}
            >
              {loading ? t("home_contactus_sending") : t("home_contactus_Send_Message")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
