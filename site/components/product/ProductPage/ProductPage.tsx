import cn from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Text } from '@components/ui'
import { Marquee, Hero } from '@components/ui'
import { SEO } from '@components/common'
import styles from "./ProductPage.module.scss"
import ProductSidebar from "./ProductSidebar/ProductSidebar"
import ProductInfo from "./ProductInfo/ProductInfo"
import ProductImages from "./ProductImages/ProductImages"
import {Swiper , SwiperSlide} from "swiper/react"
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper";
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";
 
interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductPage: FC<ProductViewProps> = ({product, relatedProducts}) => {
  const [index , setIndex] = useState(0);
  useEffect(() => {

  })
  return (
    <div className={styles.productPageContainer}>

      {/* ======= Product Window ====== */}
      <div className={styles.productWindow}>
        <div className={styles.leftContainer}>
          <ProductImages product={product}/>
          <ProductInfo product={product}/>
        </div>
        <ProductSidebar
          product={product}
        />
      </div>

      {/* ======= Related Products */}
      <div className={styles.bottomHeader}>
        <h4>Related Products</h4>
      </div>
      <div className={styles.borderBottom}>
        <hr />
      </div>
      <div className={styles.sugestedProducts}>
        <div className={styles.swiperContainer}>
          <Marquee className={styles.marquee}>
            {relatedProducts.slice(0, 5).map((product: any, i: number) => (
              <ProductCard key={product.id} product={product} variant="custom" />
            ))}
          </Marquee>
        </div>
      </div>


      
    <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </div>
  )
}

export default ProductPage
 