import React from 'react'

const ContactUs = () => {
  return (
    <div className=' flex flex-col justify-center items-center px-[16px] py-[60px] md:py-[130px]'>
      <div className=' flex justify-center items-center text-center text-[20px] md:text-[64px] font-[800] pb-[30px]'>CONTACT US</div>
      <div className=' flex justify-center items-center bg-[#D9D9D9] rounded-2xl w-full md:w-[700px]'>
        <form className=' flex flex-col gap-4 p-[20px] md:p-[50px] w-full'>
          <div className=' flex flex-col gap-1'>
            <label className=' text-[16px] md:text-[20px] font-[500]'>Name</label>
            <input className=' bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]' type="text" name="name" required />
          </div>
          <div className=' flex flex-col gap-1'>
            <label className=' text-[16px] md:text-[20px] font-[500]'>Email</label>
            <input className=' bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]' type="email" name="email" required />
          </div>
          <div  className=' flex flex-col gap-1'>
            <label className=' text-[16px] md:text-[20px] font-[500]'>Phone Number</label>
            <input className=' bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]' type="text" name="phoneno" required />
          </div>
          <div className=' flex flex-col gap-1'>
            <label className=' text-[16px] md:text-[20px] font-[500]'>Product Details</label>
            <input className=' bg-white px-[6px] py-[10px] text-[14px] rounded-[6px]' type="text" name="productDetails" required />
          </div>
          <div className=' flex flex-col gap-1'>
            <label className=' text-[16px] md:text-[20px] font-[500]'>Your Message</label>
            <textarea className=' bg-white p-[4px] text-[14px] rounded-[6px] min-h-[150px]'></textarea>
          </div>
          <div className=' flex justify-center items-center pt-[10px] md:pt-[20px]'>
            <button type='submit' className=' bg-[#0081AE] text-white w-full md:w-[80%] py-[8px] md:py-[16px] cursor-pointer rounded-xl'>Send Message</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
