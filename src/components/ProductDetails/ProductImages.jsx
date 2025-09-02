import react,{ useState } from "react";

import tshirt1 from '../../assets/productDetails/tshirt/image1.jpg';
import tshirt2 from '../../assets/productDetails/tshirt/image2.jpg';
import tshirt3 from '../../assets/productDetails/tshirt/image3.jpg';
import tshirt4 from '../../assets/productDetails/tshirt/image4.jpg';
import tshirt5 from '../../assets/productDetails/tshirt/image5.jpg';
import shirt1 from '../../assets/productDetails/shirt/image1.jpg';
import shirt2 from '../../assets/productDetails/shirt/image2.jpg';
import shirt3 from '../../assets/productDetails/shirt/image3.jpg';
import shirt4 from '../../assets/productDetails/shirt/image4.jpg';
import shirt5 from '../../assets/productDetails/shirt/image5.jpg';
import pant1 from '../../assets/productDetails/pant/image1.jpg';
import pant2 from '../../assets/productDetails/pant/image2.jpg';
import pant3 from '../../assets/productDetails/pant/image3.jpg';
import pant4 from '../../assets/productDetails/pant/image4.jpg';
import pant5 from '../../assets/productDetails/pant/image5.jpg';
import cap1 from '../../assets/productDetails/cap/image1.jpg';
import cap2 from '../../assets/productDetails/cap/image2.jpg';
import cap3 from '../../assets/productDetails/cap/image3.jpg';
import cap4 from '../../assets/productDetails/cap/image4.jpg';
import cap5 from '../../assets/productDetails/cap/image5.jpg';
import benies1 from '../../assets/productDetails/benies/image1.jpg';
import benies2 from '../../assets/productDetails/benies/image2.jpg';
import benies3 from '../../assets/productDetails/benies/image3.jpg';
import benies4 from '../../assets/productDetails/benies/image4.jpg';
import benies5 from '../../assets/productDetails/benies/image5.jpg';
import bag1 from '../../assets/productDetails/bag/image1.jpg';
import bag2 from '../../assets/productDetails/bag/image2.png';
import bag3 from '../../assets/productDetails/bag/image3.png';
import bag4 from '../../assets/productDetails/bag/image4.png';
import bag5 from '../../assets/productDetails/bag/image5.png';
import socks1 from '../../assets/productDetails/socks/image1.png';
import socks2 from '../../assets/productDetails/socks/image2.jpg';
import socks3 from '../../assets/productDetails/socks/image3.jpg';
import socks4 from '../../assets/productDetails/socks/image4.jpg';
import socks5 from '../../assets/productDetails/socks/image5.jpg';
import polo1 from '../../assets/productDetails/polo/image1.jpg';
import polo2 from '../../assets/productDetails/polo/image2.jpg';
import polo3 from '../../assets/productDetails/polo/image3.jpg';
import polo4 from '../../assets/productDetails/polo/image4.jpg';
import polo5 from '../../assets/productDetails/polo/image5.jpg';

const imageMap = {
  "tshirt1": tshirt1, 
  "tshirt2": tshirt2, 
  "tshirt3": tshirt3, 
  "tshirt4": tshirt4, 
  "tshirt5": tshirt5,
  "shirt1": shirt1, 
  "shirt2": shirt2, 
  "shirt3": shirt3, 
  "shirt4": shirt4, 
  "shirt5": shirt5,
  "pant1": pant1, 
  "pant2": pant2, 
  "pant3": pant3, 
  "pant4": pant4, 
  "pant5": pant5,
  "cap1": cap1, 
  "cap2": cap2, 
  "cap3": cap3, 
  "cap4": cap4, 
  "cap5": cap5,
  "benies1": benies1, 
  "benies2": benies2, 
  "benies3": benies3, 
  "benies4": benies4, 
  "benies5": benies5,
  "bag1": bag1, 
  "bag2": bag2, 
  "bag3": bag3, 
  "bag4": bag4, 
  "bag5": bag5,
  "socks1": socks1, 
  "socks2": socks2, 
  "socks3": socks3, 
  "socks4": socks4, 
  "socks5": socks5,
  "polo1": polo1, 
  "polo2": polo2, 
  "polo3": polo3, 
  "polo4": polo4, 
  "polo5": polo5
};

const ProductImages = ({ images, onImageLoad }) => {
    const [selected, setSelected] = useState(0);
    return (
    <div className=" flex justify-between items-center gap-6">
      {/* Main Image */}
        <div>
            <img
                src={imageMap[images[selected]]}
                alt={images[selected]}
                className=" w-[100%] h-[400px] md:h-[500px] border-2 border-gray-300 object-cover"
                onLoad={() => onImageLoad(images[selected])}
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
                onLoad={() => onImageLoad(img)}
            />
            ))}
        </div>
    </div>
    );
};

export default ProductImages;