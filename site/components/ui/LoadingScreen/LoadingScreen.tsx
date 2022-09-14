import React from 'react'
import loadingS from "./LoadingScreen.module.scss"
import Logo from '../Logo'
import Image from "next/image"

const LoadingScreen = () => {
  return (
    <div className={loadingS.loadingWindow + " animated fadeIn"}>
      <div className={loadingS.loadingContainer}>
        <div className={loadingS.logo + " animated fadeIn"}>
          <Logo/>
        </div>
        <div className={loadingS.spinner}>
            <Image src="/spinner.gif" width={200} height={200}  />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
