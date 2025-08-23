import react,{ useState } from "react";

import tshirt1 from '../../assets/productDetails/tshirt/image1.jpg';
import tshirt2 from '../../assets/productDetails/tshirt/image2.jpg';
import tshirt3 from '../../assets/productDetails/tshirt/image3.jpg';
import tshirt4 from '../../assets/productDetails/tshirt/image4.jpg';
import tshirt5 from '../../assets/productDetails/tshirt/image5.jpg';

const imageMap = {
  "tshirt1": tshirt1, 
  "tshirt2": tshirt2, 
  "tshirt3": tshirt3, 
  "tshirt4": tshirt4, 
  "tshirt5": tshirt5,
  "shirt1": tshirt1, 
  "shirt2": tshirt2, 
  "shirt3": tshirt3, 
  "shirt4": tshirt4, 
  "shirt5": tshirt5,
  "pant1": tshirt1, 
  "pant2": tshirt2, 
  "pant3": tshirt3, 
  "pant4": tshirt4, 
  "pant5": tshirt5,
  "cap1": tshirt1, 
  "cap2": tshirt2, 
  "cap3": tshirt3, 
  "cap4": tshirt4, 
  "cap5": tshirt5,
  "benies1": tshirt1, 
  "benies2": tshirt2, 
  "benies3": tshirt3, 
  "benies4": tshirt4, 
  "benies5": tshirt5,
  "bag1": tshirt1, 
  "bag2": tshirt2, 
  "bag3": tshirt3, 
  "bag4": tshirt4, 
  "bag5": tshirt5,
  "socks1": tshirt1, 
  "socks2": tshirt2, 
  "socks3": tshirt3, 
  "socks4": tshirt4, 
  "socks5": tshirt5
};

const ProductImages = ({ images }) => {
    const [selected, setSelected] = useState(0);
    return (
    <div className=" flex justify-between items-center gap-6">
      {/* Main Image */}
        <div>
            <img
                src={imageMap[images[selected]]}
                alt={images[selected]}
                className=" w-[100%] h-[400px] md:h-[500px] border-2 border-gray-300 object-contain"
            />
        </div>
        {/* Thumbnails */}
        <div className=" flex flex-col gap-4">
            {images.map((img, idx) => (
            <img
                key={idx}
                src={imageMap[img]}
                alt={img}
                className={`w-[62px] h-[75px] object-cover cursor-pointer rounded 
                ${selected === idx ? 'border-2 border-white' : 'border-2 border-gray-400 opacity-70'}`}
                onClick={() => setSelected(idx)}
            />
            ))}
        </div>
    </div>
    );
};

export default ProductImages;