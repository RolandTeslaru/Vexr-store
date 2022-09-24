import React from 'react'
import type { Product } from '@commerce/types/product'
import { FC, useEffect, useState } from 'react'
import usePrice from '@framework/product/use-price'
import { useAddItem } from '@framework/cart'
import { Button, Text, Collapse, useUI } from '@components/ui'
import ProductOptions from '@components/product/ProductOptions'
import {
    getProductVariant,
    selectDefaultOptionFromProduct,
    SelectedOptions,
} from "../../helpers"
import styles from "./ProductSidebar.module.scss"
import ProductTag from "../../ProductTag/ProductTag"
import {ImEye} from "react-icons/im"
import Rating from '@mui/material/Rating';

interface ProductSidebarProps {
    product: Product
    className?: string
  }

const ProductSidebar: FC<ProductSidebarProps> = ({product}) => {

    const addItem = useAddItem()
    const { openSidebar, setSidebarView } = useUI()
    const [loading, setLoading] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
    const { price } = usePrice({
      amount: product.price.value,
      baseAmount: product.price.retailPrice,
      currencyCode: product.price.currencyCode!,
    })
    const [isMobile, setIsMobile] = useState(false);
    const max = 769;
    const min = 694
    const viewers = Math.floor((Math.random() * (max - min + 1) + min))
    const handleMobile = () => { 
      if(window.innerWidth < 1200){
        setIsMobile(true);
      }
      else{
        setIsMobile(false);
      }
    }
    useEffect(() => {
      window.addEventListener("resize" , handleMobile);
    })
    
    useEffect(() => {
        selectDefaultOptionFromProduct(product, setSelectedOptions)
      }, [product])
  
    const variant = getProductVariant(product, selectedOptions)
    const addToCart = async () => {
        setLoading(true)
        try {
            await addItem({
                productId: String(product.id),
                variantId: String(variant ? variant.id : product.variants[0]?.id),
            })
            setSidebarView('CART_VIEW')
            openSidebar()
            setLoading(false)
            } catch (err) {
            setLoading(false)
        }
    }
    
    const addToWishlist = async () => {
      setLoading(true)
      try {
        await addItem({
          productId: String(product.id),
          variantId: String(variant ? variant.id : product.variants[0]?.id),
        })
        setSidebarView('WISHLIST_VIEW')
        } catch (err) {
          setLoading(false);
      }
    }

  return (
    <div className={styles.sidebarContainer}>
      {/* ======== D E S K T O P ========= */}
      <div className={`${styles.desktop}`}>
        <ProductTag
            name={product.name}
            price={`${price}`}
            fontSize={32}
        />
        <div className={styles.info}>
        <div className={styles.viewers}><ImEye/> {viewers} people are viewing this right now</div>
        <div className={styles.rating}>
          <Rating value={5} size={'small'} readOnly/>
          <div className={styles.ratingText}>36 reviews</div>
        </div>
      </div>
        <ProductOptions
            options={product?.options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
        />
        {process.env.COMMERCE_CART_ENABLED && (
            <Button
                aria-label="Add to Cart"
                type="button"
                className={styles.button}
                onClick={addToCart}
                disabled={variant?.availableForSale === false}
            >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
          </Button>
        )}
        {/* Description */}
        {/* <Text
              className={styles.descriptionText}
              html={product.descriptionHtml || product.description}
          /> */}
      </div>
      
      {/* ===== M O B I L E ====== */}
      <div className={styles.mobile}>
          <div className={styles.left}>
            <div className={styles.nameTag_container}>
              {/* <ProductTag
                name={product.name}
                fontSize={20}
                price={""}
              /> */}
              <h1 className={styles.productTag}>{product.name}</h1>
              <h2 className={styles.priceTag}>{price}</h2>
            </div>
            <div className={styles.productOptions}>
              <ProductOptions
                options={product?.options}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            </div>
          </div>
          <div className={styles.right}>
            <Button
              aria-label='Buy now'
              type='button'
              className={styles.button2}
              onClick={addToCart}
              disabled={variant?.availableForSale === false}
            >
            {variant?.availableForSale === false
                  ? 'Not Available'
                  : 'Buy now'}
            </Button>
            {process.env.COMMERCE_CART_ENABLED && (
              <Button
                  aria-label="Add to Cart"
                  type="button"
                  className={styles.button}
                  onClick={addToCart}
                  disabled={variant?.availableForSale === false}
              >
                {variant?.availableForSale === false
                  ? 'Not Available'
                  : 'Add To Cart'}
              </Button>
            )}
          </div>
      </div>
    </div>
  )
}

export default ProductSidebar
