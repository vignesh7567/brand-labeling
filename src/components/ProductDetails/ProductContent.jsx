import React from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const ProductContent = ({ product }) => {
const { t } = useTranslation();
return (
  <div className=" flex flex-col max-w-[320px] border-2 border-[#D9D9D9] p-[40px]">
    <div>
        <div className=" flex flex-col font-[500] text-[14px]">
            <div>{product.name}</div>
            {/* <div>€ {product.price}</div> */}
        </div>
    </div>
    {/* <div className=" text-[12px] text-[#0000008C] py-[16px]">MRP incl. of all taxes</div> */}
    <div className=" text-[13px] lowercase">{product.description}</div>
    <div className=" pt-4 pb-2">
        <div className=" text-[12px]">{t('productdetails_productcontext_Color')}</div>
        <div className="flex gap-2 py-2">
            {product.colors && product.colors.map((color, idx) => (
            <div
                key={idx}
                className="w-[35px] h-[35px] border-2 border-gray-200"
                style={{ backgroundColor: color }}
                title={color}
            />
            ))}
        </div>
    </div>
    <div className=" pb-2">
        <div className=" text-[12px]">size</div>
        <div className="flex flex-wrap gap-2 py-2">
            {product.sizes && product.sizes.map((size, idx) => (
            <div
                key={idx}
                className="w-[35px] h-[35px] border-1 border-black flex justify-center items-center text-[10px]"
            >{size}</div>
            ))}
        </div>
    </div>
    <div className=" text-[#0000008C] text-[10px]">{t('productdetails_productcontext_find_size')}</div>
    <div className=" flex items-center gap-1 pt-2">
        <div className=" text-[12px]"><MdOutlineCalendarToday /></div>
        <div className=" text-[10px]">{t('productdetails_productcontext_production')}</div>
    </div>
  </div>
)};

export default ProductContent;