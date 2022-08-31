import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'
import styles from "./ProductCard.module.scss"

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple' | 'custom' | 'grid'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' , [s.custom]: variant === 'custom'},
    className
  )

  return (
    <Link href={`/product/${product.slug}`}>
      <a className={rootClassName} aria-label={product.name}>
        {variant === 'grid' && (
          <div className={styles.gridImg}>
            <div className={styles.product_card}>
              <div className="header">

              </div>
              {product?.images && (
                <>
                <img
                quality="85"
                src={product.images[0]?.url || placeholderImg}
                alt={product.name || 'Product Image'}
                className={styles.product_image}
                {...imgProps}
                />
                </>
              )}
              <div className={styles.infoContainer}>
                <p className={styles.product_name}>{product.name}</p>
                <p className={styles.product_price}>{`${price}`}</p>
              </div>
              
              {/* {[...Array(rating)].map((e ,i) => <AiFillStar key={i}/>)}
              {[...Array(5-rating)].map((e ,i) => <AiOutlineStar key={i}/>)} */}
            </div>
          </div>
        )}
        {variant === 'custom' && (
          <div className={styles.customImg}>
            <div className={styles.product_card}>
              <div className="header">

              </div>
              {product?.images && (
                <>
                  <img
                  quality="85"
                  src={product.images[0]?.url || placeholderImg}
                  alt={product.name || 'Product Image'}
                  className={styles.product_image}
                  layout="fill"
                  {...imgProps}
                  />
                </>
              )}
              <div className={styles.infoContainer}>
                <p className={styles.product_name}>{product.name}</p>
                <p className={styles.product_price}>{`${price}`}</p>
              </div>
              {/* {[...Array(rating)].map((e ,i) => <AiFillStar key={i}/>)}
              {[...Array(5-rating)].map((e ,i) => <AiOutlineStar key={i}/>)} */}
            </div>
          </div>
        )}
        {variant === 'slim' && (
          <>
            <div className={s.header}>
              <span>{product.name}</span>
            </div>
            {product?.images && (
              <div>
                <Image
                  quality="85"
                  src={product.images[0]?.url || placeholderImg}
                  alt={product.name || 'Product Image'}
                  height={320}
                  width={320}
                  layout="fixed"
                  {...imgProps}
                />
              </div>
            )}
          </>
        )}

        {variant === 'simple' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
            {!noNameTag && (
              <div className={s.header}>
                <h3 className={s.name}>
                  <span>{product.name}</span>
                </h3>
                <div className={s.price}>
                  {`${price} ${product.price?.currencyCode}`}
                </div>
              </div>
            )}
            <div className={s.imageContainer}>
              {product?.images && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[0]?.url || placeholderImg}
                    height={540}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {variant === 'default' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0] as any}
              />
            )}
            <ProductTag
              name={product.name}
              price={`${price} ${product.price?.currencyCode}`}
            />
            <div className={s.imageContainer}>
              {product?.images && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[0]?.url || placeholderImg}
                    height={540}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard