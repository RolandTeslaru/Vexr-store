import cn from 'clsx'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Container, Skeleton } from '@components/ui'

import useSearch from '@framework/product/use-search'

import styles from "./Catalog.module.scss"

import getSlug from '@lib/get-slug'
import rangeMap from '@lib/range-map'

const SORT = {
  'trending-desc': 'Trending',
  'latest-desc': 'Latest arrivals',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
}

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'

export default function Search({ categories, brands }: SearchPropsType) {
  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

  const { pathname, category, brand } = useSearchMeta(asPath)
  const activeCategory = categories?.find((cat: any) => cat.slug === category)
  const activeBrand = brands?.find(
    (b: any) => getSlug(b.node.path) === `brands/${brand}`
  )?.node

  const { data } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.id,
    brandId: (activeBrand as any)?.entityId,
    sort: typeof sort === 'string' ? sort : '',
    locale,
  })

  const handleClick = (event: any, filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  }

  return (
      <div className={styles.container}>
        
        <div className={styles.sidebarLEFT}>
          <div className={styles.sidebar_content}>
            <div className={styles.categories}>
            
            </div>
            <div className={styles.designs}>
              <h3>Designs</h3>
            </div>
          </div>
        </div>

        <div className={styles.catalogContainer}>
            <div className={styles.catalog}>
              Catalog
            </div>
        </div>

        <div className={styles.sidebarRIGHT}>
          <div className={styles.sidebar_content}>
            sidebar Right
            <div className={styles.sort}>

            </div>
          </div>
        </div>
        
      </div>
  )
}

Search.Layout = Layout
