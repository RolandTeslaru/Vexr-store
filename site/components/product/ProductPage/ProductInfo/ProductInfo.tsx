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

  return (
    <div className={styles.productInfoContainer}>
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
