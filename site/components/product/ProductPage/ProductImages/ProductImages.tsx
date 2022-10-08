import React, { Ref, useEffect, useRef } from 'react'
import { FC, useState } from 'react'
import styles from "./ProductImages.module.scss"
import {Swiper , SwiperProps, SwiperSlide , useSwiper} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Autoplay, Scrollbar } from "swiper";
import type { Media, Product } from '@commerce/types/product'
import { Image as ImageType } from '@commerce/types/common'
// import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
import Image from "next/image"
import { useRouter } from 'next/router'

interface ProductViewProps{
    product: Product
    related?: Product[]
}
// interface SwiperRefProp extends SwiperProps{
//     ref?: Ref<any>
// }

const ProductImages: FC<ProductViewProps>= ({product}) => {

    const swiperRef = useRef(null);
    const [selectedImg, setSelectedImg] = useState(0);  
    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }  
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
                    // @ts-expect-error
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
                    {product.media?.map((video , index) => (
                        <SwiperSlide className="m-auto" key={index}>
                            {video.sources[0].format === "mp4" ?
                                 <video 
                                    controls 
                                    width={video.sources[0].width} 
                                    height={video.sources[0].height}
                                    src={video.sources[0].url}
                                />
                                    : 
                                <video 
                                    controls 
                                    width={video.sources[1].width} 
                                    height={video.sources[1].height}
                                    src={video.sources[1].url}
                                />
                            }
                        </SwiperSlide>
                    ))}
                    </Swiper>
                        <div className={styles.preview}>
                            {product.images.map((image:ImageType, i:number) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <>
                                    <img 
                                        key={i}
                                        src={image.url} 
                                        alt={product.name + " " + selectedImg}
                                        className={`${styles.previewImg} ${i === selectedImg && styles.selectedImg}`}
                                        // @ts-expect-error
                                        onClick={() => {setSelectedImg(i); swiperRef.current !== null && swiperRef.current.swiper.slideTo(i)}}
                                    />
                                </>
                            ))}
                            {/* {product.media?.map((Video:VideoSource , i:number) => {
                                <>
                                    <img 
                                        src=
                                        alt="" 
                                    />
                                </>
                            })} */}
                        </div>
                </div>
        </div>
    </>
  )
}

export default ProductImages
