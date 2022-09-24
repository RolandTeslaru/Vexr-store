import React from 'react'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../../helpers'
import usePrice from '@framework/product/use-price'
import styles from "./ProductInfo.module.scss"
import {ImEye} from "react-icons/im"

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

  return (
    <div className={styles.productInfoContainer}>
      <div className={styles.info}>
        <div className={styles.viewers}><ImEye/> {viewers} people are viewing this right now</div>
        <div className={styles.rating}>
          <Rating value={5} />
          <div className={styles.ratingText}>36 reviews</div>
        </div>
      </div>
      <Collapse title="Details" >
        <Text
          className={styles.descriptionText}
          html={product.descriptionHtml || product.description}
        />
      </Collapse>
      <Collapse title='More Info'>
      </Collapse>
    </div>
  )
}

export default ProductInfo
