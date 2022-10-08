import React from 'react'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../../helpers'
import usePrice from '@framework/product/use-price'
import styles from "./ProductInfo.module.scss"
import {ImEye} from "react-icons/im"
import {MdOutlineLocalShipping} from "react-icons/md"
import Rating from '@mui/material/Rating';
import Share from '@components/common/Share/Share'
import { useRouter } from 'next/router'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductInfo: FC<ProductSidebarProps> = ({product}) => {

  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
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
  const max = 769;
  const min = 694
  const viewers = Math.floor((Math.random() * (max - min + 1) + min))
  const { asPath } = useRouter();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${asPath}`;

  return (
    <div className={styles.productInfoContainer}>
       <div className={styles.nameTag_container}>
          <h1 className={styles.productTag}>{product.name}</h1>
        </div>
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
        <h4>Share !</h4>
          <Share
            url={URL}
            facebook
            messenger
            whatsapp
            telegram
            twitter
          />
      </div>
      <Collapse title="Videos" initialState={true} color={""}>
        {product.media?.map((video , index) => {
          if(video.sources[0].format === "mp4")
            return(
              <video 
                controls 
                width={video.sources[0].width} 
                height={video.sources[0].height}
                src={video.sources[0].url}
              />
            )
          else
              return(
                <video 
                  controls 
                  width={video.sources[1].width} 
                  height={video.sources[1].height}
                  src={video.sources[1].url}
                />
              )
        })}
      </Collapse>
      <Collapse title="Details" initialState={true} >
        <Text
          className={styles.descriptionText}
          html={product.descriptionHtml || product.description}
        />
      </Collapse>
    </div>
  )
}

export default ProductInfo
