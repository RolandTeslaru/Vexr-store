import React from 'react'
import loadingS from "./LoadingScreen.module.scss"
import Logo from '../Logo'
import Image from "next/image"

const LoadingScreen = () => {
  return (
    <div className={loadingS.loadingWindow}>
      <div className={loadingS.loadingContainer}>
        <div className={loadingS.logo + " animated fadeIn"}>
          <Logo/>
        </div>
        <div className={loadingS.spinner}>
            <Image src="/spinner.gif" width={150} height={150}  />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
