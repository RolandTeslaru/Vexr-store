import React from 'react'
import styles from "../styles/Help.module.scss"
import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const { pages } = await commerce.getAllPages({ config, preview })
  const { categories, brands } = await commerce.getSiteInfo({ config, preview })
  return {
    props: {
      pages,
      categories,
      brands,
    },
    revalidate: 200,
  }
}

const help = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.helpContainer}>
        <div className={styles.logo}>

        </div>
        <div className={styles.content}>
          <div className={styles.questions}>

          </div>
          <div className={styles.policies}>

          </div>
        </div>
      </div>

    </div>
  )
}

export default help
