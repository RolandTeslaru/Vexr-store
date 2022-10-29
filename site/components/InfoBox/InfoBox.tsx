import React from 'react'
import type { Product } from '@commerce/types/product'
import {FC} from 'react'
import s from "./InfoBox.module.scss"
import { ProductCard } from '@components/product'
import { CSSProperties } from '@mui/styled-engine'
 
interface Props {
  classname?: string
  products?: Product[]
  variant: string
  images?: string[]
  text?: string
  header?: string
  backgroundImg?: string
  orient?: string
  reverse?: boolean

  styles?: CSSProperties
}

const InfoBox: FC<Props> = ({
  classname,
  products,
  variant,
  text,
  header,
  reverse,
  backgroundImg
}) => {
  return (
    <div className={s.infoBox_container + ` ${reverse === true && s.reverse}`} style = {{backgroundImage: 'url(/infobox1/background-faded1.png)'}}>
        <div className={s.content_container}>
          {variant === "products" && (
            <>
            {products?.slice(0, 3).map((product , index) => (
              <div key={index}>
                <ProductCard
                  variant='mini'
                  product={product}
                />
              </div>
            ))}
            </>
          )}
        </div>
        <div className={s.text_container + ` ${reverse && s.reverse}`}>
          <h4>{header}</h4>
          <p>{text}</p>
        </div>
    </div>
  )
}

export default InfoBox