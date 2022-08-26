import React from 'react'
import styles from "./HeroBanner.module.css"

const HeroBanner = ( {heroBanner}) => {
  return (
    <div className={styles.hero_banner_container} >
        <div className={styles.banner_left}>
            <div className={styles.hero_banner_desc}>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                {/* <Link href={`/product/${heroBanner.product}`}> */}
                    <button type='button'>{heroBanner.buttonText}</button>
                {/* </Link> */}
            </div>
        </div>
        <div className={styles.banner_right}>
            <img 
                src={heroBanner.image} 
                alt="headphones" 
                className={styles.hero_banner_image} 
            />
            <div className={styles.desc}>
                <h5>{heroBanner.smallText} </h5>
                <p>{heroBanner.desc}</p>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner