import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import styles from "./Home.module.scss"
import { ALL } from 'dns'
import bannerImages from "../info/bannerImages.js"
import Banner from '@components/Banner/Banner'
import MiniBanner from '@components/miniBanner/miniBanner'
import {Swiper , SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper";
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
  return (
    <>
      <Banner slideImages={bannerImages}></Banner>

      <div className={styles.homeContainer}>

        <MiniBanner
          img='/content/img1.jpg'
          header='Full Immersion'
          text='Be fully immersed in your video games, movies or tv shows with our LED RGB products. Reinvent your viewing experience with more color.'
        />
        <Marquee>
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
                  <h4>LED RGB products</h4>
                  <div className={styles.swiperContainer}>
                  <Swiper
                    cssMode={true}
                    pagination={{
                        clickable:true
                    }}
                    mousewheel={true}
                    centeredSlides={true}
                    
                    modules={[Navigation, Pagination, Mousewheel]}
                    className='mySwiper'
                  >
                {}
            </Swiper>
                  </div>
                </div>
                <img src="/content/img4.jpg" alt="" />
              </div>
              <div className={styles.second_row}>
                <img src="/content/photo4.jpeg" alt="" />
                <div className={styles.info}>
                  <h4>PC RGB Components</h4>
                </div>
              </div>
            </div>
          </div>

      </div>
    </>
  
  )
}

Home.Layout = Layout
