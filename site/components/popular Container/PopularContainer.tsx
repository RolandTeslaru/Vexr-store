import React, { useEffect, useState } from 'react'
import styles from "./PopularContainer.module.scss" 
import { ProductCard } from '@components/product'
import { InferGetStaticPropsType } from 'next'

const PopularContainer = ({products} : any) => {

  // const [slides , setSlides] = useState(3);
  // const handleMobile = () => {
  //   if(window.innerWidth < 700) {
  //     setSlides(2);
  //   }
  //   else {
  //     setSlides(3);
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener("resize" , handleMobile);
  // })
  return (
    <>
      <div className={styles.header}>
        <h4>Popular products</h4>
      </div>
    <div className={styles.popularContainer}
            style={{backdropFilter: 'blur(60px)' }}
        >
          <div className={styles.backgroundBlur}>
            <div className={styles.content}>
              
            </div>
              <div className={styles.first_row}>
                <div className={styles.info}>
                  <h4 className={styles.hide}>LED RGB products</h4>
                  <div className={styles.swiperContainer}>
                  {products.map((product:any , index: number) => (
                    <ProductCard product={product} variant='mini' key={index} className={styles.listItem} />
                  ))}
                </div>
              </div>
              <div className={styles.imgContainer + " animated fadeIn"} style = {{backgroundImage: 'url(/content/img4.webp)'}}>
                <h4 className={styles.headerImg}>LED RGB products</h4>
              </div>
                
              </div>
              <div className={styles.second_row}>
                <div className={styles.info}>
                  <h4 className={styles.hide}>PC RGB Components</h4>
                    {/* <img src="/content/photo4.jpeg" alt="" className={styles.thumbnail}/> */}
                  <div className={styles.swiperContainer}>
                    {products.slice(products.length - 3).map((product:any , index: number) => (
                        <ProductCard product={product} variant='mini' className={styles.listItem} key={index}/>
                    ))}
                  </div>
                </div>
                <div className={styles.imgContainer + " animated fadeIn"} style = {{backgroundImage: 'url(/content/photo4.webp)'}}>
                  <h4 className={styles.headerImg + " fadeIn"}>PC RBB PRODUCTS</h4>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default PopularContainer
