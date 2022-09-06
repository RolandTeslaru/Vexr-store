import React from 'react'
import styles from "./Banner.module.scss"
import Link from 'next/link'
import {Swiper , SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper";
import { Text } from '@components/ui';
import {Button} from '@components/ui';
import { ArrowRight } from '@components/icons'

const Banner = ({slideImages}:any) => {
  return (
    <div className={styles.BannerContainer}>
        <div className={styles.infoBoxContainer}>
            <div className={styles.infoBox}>
                <Text variant='sectionHeading'>Enhance your gaming experience today with new and amazing products</Text>
                <Link href="/search"> 
                    <Button >
                        <ArrowRight width="20" heigh="20" className="ml-1" />
                         All products
                    </Button>
                </Link>
            </div>
        </div>
        <div className={styles.swiperContainer}>
            <Swiper
                cssMode={true}
                pagination={{
                    clickable:true
                }}
                mousewheel={true}
                centeredSlides={true}

                autoplay={{
                    delay:2300,
                    disableOnInteraction: false
                }}
                modules={[Navigation, Pagination, Mousewheel, Autoplay]}
                className='mySwiper'

                
            >
                {slideImages.map((image:any, index:number) => (
                    <SwiperSlide key={index}>
                        <img src={image.url} alt={image.caption} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        
    </div>
  )
}

export default Banner
