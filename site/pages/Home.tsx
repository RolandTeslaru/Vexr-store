import React from 'react'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import commerce from '@lib/api/commerce';
import styles from "./Home.module.scss"
import { Marquee } from '@components/ui';
import { ProductCard } from '@components/product';
import HeroBanner from '@components/HeroBanner/HeroBanner';

export async function getStaticProps({preview , locale , locales}: GetStaticPropsContext) {
    const config = {locale, locales};
    const productPromise = commerce.getAllProducts({
        variables: {first: 6},
        config,
        preview,
        ...({featured: true} as any)
    })
    const pagesPromise = commerce.getAllPages({config, preview});
    const siteInfoPromise = commerce.getSiteInfo({config , preview});
    const {products} = await productPromise;
    const {pages} = await pagesPromise;
    const {categories , brands} = await siteInfoPromise;

    return {
        props: {
            products,
            categories,
            brands,
            pages,
        },
        revalidate: 60,
    }
}

const Home = ({products,}: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <div className={styles.homeContainer}>
        <h4>ELLOODAS </h4>

        <Marquee variant="secondary" className={styles.product_slider}>
            {products.slice(0, 3).map((product:any, index: number,) => (
                <ProductCard 
                    key={index} 
                    product={product} 
                    variant="custom"
                />
            ))}
        </Marquee>
    </div>
  )
}

export default Home