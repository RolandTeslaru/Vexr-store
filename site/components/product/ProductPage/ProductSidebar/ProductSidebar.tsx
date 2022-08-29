import React from 'react'
import type { Product } from '@commerce/types/product'
import { FC, useEffect, useState } from 'react'
import usePrice from '@framework/product/use-price'
import { useAddItem } from '@framework/cart'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import ProductOptions from '@components/product/ProductOptions'
import {
    getProductVariant,
    selectDefaultOptionFromProduct,
    SelectedOptions,
} from "../../helpers"
import styles from "./ProductSidebar.module.scss"
import ProductTag from "../../ProductTag/ProductTag"

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
    <div className={styles.sidebarContainer}>
        <ProductTag
            name={product.name}
            price={`${price}`}
            fontSize={32}
        />
        <div className="flex flex-row justify-between items-center">
            <Rating value={4} />
            <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
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
                loading={loading}
                disabled={variant?.availableForSale === false}
            >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
          </Button>
        )}
        <Text
              className={styles.descriptionText}
              html={product.descriptionHtml || product.description}
          />
    </div>
  )
}

export default ProductSidebar
