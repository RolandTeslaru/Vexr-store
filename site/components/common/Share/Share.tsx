import React, { FC } from 'react'
import styles from "./Share.module.scss"
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
  } from 'next-share';

interface ShareProps {
    facebook?:boolean | undefined
    messenger?:boolean | undefined
    whatsapp?:boolean | undefined
    telegram?:boolean | undefined
    twitter?:boolean | undefined
    pinterest?:boolean | undefined
    url:string 
}

const Share: FC<ShareProps> = ({
    url,
    facebook,
    messenger,
    whatsapp,
    telegram,
    twitter,
    pinterest,
 }) => {
  return (
    <div className={styles.ShareContainer}>
        {facebook && (
            <FacebookShareButton
              url={url} >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
        )}
        { messenger && (
            <FacebookMessengerShareButton
                url={url}
                appId={''}
            > 
                <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
        )}
        {whatsapp && (
            <WhatsappShareButton
                url={url} >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
        )}
        {telegram && (
            <TelegramShareButton
                url={url}
                title={"Checkout this high quality product from Vexr "}
            >
                <TelegramIcon size={32} round />
            </TelegramShareButton>
        )}
        {twitter && (
            <TwitterShareButton
                url={url}
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        )}
    </div>
  )
}

export default Share