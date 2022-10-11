import React from 'react'
import styles from "./miniBanner.module.scss"
import { FC } from 'react'
import { ImageProps } from 'next/image'

interface Props{
    className?: string
    img:string
    header?:string
    text?:string
}

const MiniBanner:FC<Props> = ({
    className,
    header = "",
    text = "",
    img
}) => {
  return (
    <div 
        className={styles.miniBannerContainer}
        style={{ backgroundImage: `url(${img})` }}
    >
        <div className={styles.textContainer}>
            <h1>{header}</h1>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default MiniBanner
