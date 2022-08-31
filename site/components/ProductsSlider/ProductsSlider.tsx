import { InferGetServerSidePropsType } from 'next'
import React from 'react'
import styles from "./ProductsSlider.module.scss"
import ProductCard from '@components/product/ProductCard'

const ProductsSlider = ({products,}: any) => {
  return (
    <div className={`track ${styles.productsSlider_container}`}>
        {products.map((product:any , index: number) => {
            <ProductCard key={index} product={product}/>
        })}
    </div>
  )
}

export default ProductsSlider