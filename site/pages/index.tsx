import commerce from '@lib/api/commerce'
import { Layout, SEO } from '@components/common'
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
import PopularContainer from '@components/popular Container/PopularContainer'
import InfoBox from '@components/InfoBox/InfoBox'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 10 },
    config,
    preview,
    // for Saleor provider only
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
export default function Home({products}: 
  InferGetStaticPropsType<typeof getStaticProps>) 
  {
    console.log("ALL products " + JSON.stringify(products))
    
  return (
    <>
      <Banner slideImages={bannerImages}/>
      <InfoBox
        variant='products'
        products={products}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
        header={"Top sellers"}
        backgroundImg="/infobox1/background-faded1.png"
      />
      <InfoBox
        variant='products'
        products={products}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
        header={"GPU Brackets"}
        backgroundImg="/infobox1/background-faded2.png"
        reverse
      />
      <div className={styles.homeContainer + " animated fadeIn"}>
        <MiniBanner
          img='/content/img1.webp'
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
        <PopularContainer
          products = {products}
        />
      </div>

      <SEO
        title='Vexr'
      />
    </>
  
  )
}
Home.Layout = Layout
