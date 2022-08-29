import cn from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'
import styles from "./ProductPage.module.scss"
import ProductSidebar from "./ProductSidebar/ProductSidebar"
import ProductInfo from "./ProductInfo/ProductInfo"
import ProductImages from "./ProductImages/ProductImages"
 
interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductPage: FC<ProductViewProps> = ({product, relatedProducts}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const [index , setIndex] = useState(0);

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
      {/* Product images */}
      {/* Product sidebar */}
      {/* Product info */}


      {/* ======= Related Products */}
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
 