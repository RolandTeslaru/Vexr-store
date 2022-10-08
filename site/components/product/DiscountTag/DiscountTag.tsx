import React from 'react'
import styles from "./DiscountTag.module.scss"

interface DiscountProps {
    discount?:string
    oldPrice?:string
    className?:string
}

const DiscountTag = ({discount , oldPrice}:DiscountProps) => {
  return (
    <div className={styles.discountTag}>
        <h3>-{discount}
            <h3 className=" line-through text-slate-300">
                {oldPrice}
            </h3>
        </h3>
    </div>
  )
}

export default DiscountTag