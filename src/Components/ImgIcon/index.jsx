/*
 * @Description: img icon component
 * @Author:
 * @Date: 2023-10-20 14:00:02
 * @LastEditTime: 2023-12-28 16:44:00
 * @LastEditors:
 */
import { useState } from "react";

// type："png" | "jpg" | "jpeg" | "gif";
export default function ImgIcon({ icon, type = "png", width = "24px", height = "24px", defaultIcon, className, style, ...rest }) {
   const makeIconSrc = (icon, type) => new URL(`../../Assets/Icons/Img/${icon}.${type}`, import.meta.url).href;
   const handleError = () => {
      if (defaultIcon) {
         setIconSrc(new URL(`../../Assets/Icons/Img/${defaultIcon}.${type}`, import.meta.url).href);
      }
   };

   const [iconSrc, setIconSrc] = useState(makeIconSrc(icon, type));

   return (
      <img
         style={{ width: width, height: height, verticalAlign: "middle", ...style }}
         className={className}
         src={iconSrc}
         onError={handleError}
         {...rest}
      />
   );
}
