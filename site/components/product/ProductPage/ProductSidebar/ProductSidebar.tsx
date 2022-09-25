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
import {MdOutlineLocalShipping} from "react-icons/md"
import Rating from '@mui/material/Rating';
import Router from "next/router"

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
    const [quantity, setQuantity] = useState(1);
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
    const handleBuyNow = () => {
      addToCart();
      Router.push("/checkout");
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
          <hr />
          <div className={styles.text}><MdOutlineLocalShipping/> &nbsp; Free shipping</div>
          <div className={styles.text}><ImEye/>&nbsp; {viewers} people are viewing this right now</div>
          <div className={styles.text}>Price includes VAT</div>
          <hr />
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
          <Button
              aria-label='Buy now'
              type='button'
              className={styles.button2}
              disabled={variant?.availableForSale === false}
              onClick={handleBuyNow}
              Component="a"
            >Buy now</Button>
        {/* Description */}
        {/* <Text
              className={styles.descriptionText}
              html={product.descriptionHtml || product.description}
          /> */}
      </div>
      
      {/* ===== M O B I L E ====== */}
      <div className={styles.mobile}>
          <div className={`${product.options.length > 0 ? styles.left : styles.hide}`}>
           
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
              disabled={variant?.availableForSale === false}
              onClick={handleBuyNow}
              Component="a"
              href="/checkout" 
            >
            {variant?.availableForSale === false
                  ? 'Not Available'
                  : `Buy now ${price}`}
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
