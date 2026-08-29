import styles from "./Branding.module.css";
import { Image } from "../../atoms/Image";
import type { HTMLAttributes } from "react";

export interface BrandingProps extends Pick<HTMLAttributes<HTMLDivElement>, "className"> {
  hasEmblem?: boolean;
  hasSeperator?: boolean;
  direction?: "horizontal" | "vertical";
}

const Branding = ({
    hasEmblem,
    hasSeperator,
    className = "",
    direction = "horizontal", // horizontal | vertical
    }: BrandingProps
  ) => {

  const layoutClass = direction === "vertical"
    ? styles.vertical
    : styles.horizontal;

  return (
    <div className={`${layoutClass} ${className}`}> 
        {hasEmblem && (
            <span> 
                <Image alt="Emblem" src="https://cdn-beta.mybharats.in/mybharat/assets/img/yuva_landing/YASLogo_opt_2x.png"/>
            </span>
        )}
           {hasSeperator && (
             <div className={styles.separator}></div>

        )}
        <span>
            <Image alt="Logo" src="https://cdn-beta.mybharats.in/mybharat/assets/img/yuva_landing/mybharatlogo_opt_2x.png"/>
        </span>  
    </div>
  );
};

export default Branding;