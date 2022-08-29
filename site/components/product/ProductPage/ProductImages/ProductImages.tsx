import React from 'react'
import Image from 'next/image'
import { SEO } from '@components/common'
import { FC, useState } from 'react'
import styles from "./ProductImages.module.scss"
import ProductSlider from '@components/product/ProductSlider'
import type { Product } from '@commerce/types/product'
interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductImages: FC<ProductViewProps> = ({product}) => {
  return (
    <div className={styles.productImagesContainer}>
      <ProductSlider key={product.id}>
        {product.images.map((image, i) => (
          <div key={image.url} className={styles.imageContainer}>
            <Image
              className={styles.img}
              src={image.url!}
              alt={image.alt || 'Product Image'}
              priority={i === 0}
              width={500}
              height={500}
              quality="85"
            />
          </div>
        ))}
      </ProductSlider>
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

export default ProductImages
