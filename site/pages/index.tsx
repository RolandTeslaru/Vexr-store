import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import styles from "../styles/Home.module.scss"
import { ALL } from 'dns'
import bannerImages from "../info/bannerImages.js"
import Banner from '@components/Banner/Banner'
import MiniBanner from '@components/miniBanner/miniBanner'
import {Swiper , SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper";
import { useEffect, useRef, useState } from 'react'
// import banner from 'shopify---clever-products-7224/schemas/banner'
// import Infobox from '@components/infobox/infobox'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}
export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const [slides , setSlides] = useState(3);
  const handleMobile = () => {
    if(window.innerWidth < 700) {
      setSlides(2);
    }
    else {
      setSlides(3);
    }
  }
  useEffect(() => {
    window.addEventListener("resize" , handleMobile);
  })

  return (
    <>
      {/* Banner slideshow */}
      <Banner slideImages={bannerImages}></Banner>

      <div className={styles.homeContainer + " animated fadeIn"}>

        <MiniBanner
          img='/content/img1.jpg'
          header='Full Immersion'
          text='Be fully immersed in your video games, movies or tv shows with our LED RGB products. Reinvent your viewing experience with more color.'
        />
        <Marquee className={styles.marquee}>
          {products.slice(0, 5).map((product: any, i: number) => (
            <ProductCard key={product.id} product={product} variant="custom" />
          ))}
        </Marquee>
        <Hero
          headline="Reinvent your gaming setup"
          description="Our RGB LED technologies were designed to  energize your home or business with incredibly vibrant colors and high-quality light effects "
        />

        <div className={styles.popularContainer}
            style={{backdropFilter: 'blur(60px)' }}
        >
          <div className={styles.backgroundBlur}>
            <div className={styles.header}>
              <h2>Popular products</h2>
            </div>
            <div className={styles.content}>
            </div>
              <div className={styles.first_row}>
                <div className={styles.info}>
                  <h4 className={`${slides === 2 && styles.hide}`}>LED RGB products</h4>
                  <div className={styles.swiperContainer}>
                  {products.slice(0,slides).map((product:any , index: number) => (
                    <ProductCard product={product} variant='mini' key={index}/>
                  ))}
                </div>
              </div>
              <div className={styles.imgContainer + " animated fadeIn"} style = {{backgroundImage: 'url(/content/img4.jpg)'}}>
                <h4 className={`${slides === 2 ? styles.headerImg : styles.hide}`}>LED RGB products</h4>
              </div>
                
              </div>
              <div className={styles.second_row}>
                <div className={styles.info}>
                  <h4 className={`${slides === 2 && styles.hide}`}>PC RGB Components</h4>
                    {/* <img src="/content/photo4.jpeg" alt="" className={styles.thumbnail}/> */}
                  <div className={styles.swiperContainer}>
                    {products.slice(0,slides).map((product:any , index: number) => (
                      <ProductCard product={product} variant='mini' key={index}/>
                    ))}
                  </div>
                </div>
                <div className={styles.imgContainer + " animated fadeIn"} style = {{backgroundImage: 'url(/content/photo4.jpeg)'}}>
                  <h4 className={`${slides === 2 ? styles.headerImg : styles.hide}` + " fadeIn"}>PC RBB PRODUCTS</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  
  )
}

Home.Layout = Layout
