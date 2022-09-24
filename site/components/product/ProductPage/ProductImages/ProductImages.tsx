import React, { useRef } from 'react'
import { FC, useState } from 'react'
import styles from "./ProductImages.module.scss"
import {Swiper , SwiperSlide , useSwiper} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Autoplay, Scrollbar } from "swiper";
import type { Product } from '@commerce/types/product'
import { Image as ImageType } from '@commerce/types/common'
// import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
import Image from "next/image"

interface ProductViewProps{
    product: Product
    related?: Product[]
}

const ProductImages: FC<ProductViewProps>= ({product}) => {

    const swiperRef = useRef(null);
    const [selectedImg, setSelectedImg] = useState(0);
  return (
    <>
        <div className={styles.productImages}>
            <div className={styles.container}>
                    <Swiper
                        cssMode={true}
                        pagination={{
                            clickable:true
                        }}
                        scrollbar={{draggable: true}}
                        mousewheel={true}
                        centeredSlides={true}
                        modules={[Navigation, Pagination, Mousewheel, Scrollbar]}
                        navigation
                        className={styles.swiper}
                        onSlideChange ={(swiper) => {setSelectedImg(swiper.activeIndex); }}
                        
                        ref={swiperRef}
                    >
                        {product.images.map((image:ImageType, i:number) => (
                            <SwiperSlide key={i}>
                                <Image 
                                    src={image.url} 
                                    alt={product.name + " " + selectedImg}
                                    width={720}
                                    height={720}     
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                        {console.log(selectedImg)
                        }
                        <div className={styles.preview}>
                            {product.images.map((image:ImageType, i:number) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img 
                                    key={i}
                                    src={image.url} 
                                    alt={product.name + " " + selectedImg}
                                    className={`${styles.previewImg} ${i === selectedImg && styles.selectedImg}`}
                                    // @ts-expect-error
                                    onClick={() => {setSelectedImg(i); swiperRef.current !== null && swiperRef.current.swiper.slideTo(i)}}
                                />
                            ))}
                        </div>
                </div>
        </div>
    </>
  )
}

export default ProductImages
