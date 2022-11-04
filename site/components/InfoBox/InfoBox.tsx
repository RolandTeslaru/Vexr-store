import React from 'react'
import type { Product } from '@commerce/types/product'
import {FC} from 'react'
import s from "./InfoBox.module.scss"
import { ProductCard } from '@components/product'
import { CSSProperties } from '@mui/styled-engine'
import { Text } from '@components/ui' 

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
    <div className={`${reverse && s.reverse}`}>
      <div className={s.infoBox_container} style = {{backgroundImage: `url(${backgroundImg})`}}>
          <div className={s.fade}/>
          <div className={s.content_container}>
            {variant === "products" && (
              <>
              {products?.slice(0, 3).map((product , index) => (
                <div key={index} className={s.listItem}>
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
            <div className={s.text}>
              <Text variant="heading" className={s.header}>{header}</Text>
              <Text variant='body' className={s.paragraph}>{text}</Text>
            </div>
            <div className={s.bottomFade}/>
          </div>
      </div>
    </div>
  )
}

export default InfoBox