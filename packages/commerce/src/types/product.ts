// @ts-ignore
import { VideoSource, Order } from '@vercel/commerce-shopify/schema.js'
import { type } from 'os'
import { Image } from './common'

export type ProductImage = {
  url: string
  alt?: string
}
export type Media ={
  id: string
}
export type Video = Media & {
  id:string,
  mediaContentType: string,
  preview: Image,
  sources: VideoSource[]
}

export type ProductPrice = {
  value: number
  currencyCode?: 'USD' | 'EUR' | 'ARS' | 'GBP' | string
  retailPrice?: number
  salePrice?: number
  listPrice?: number
  extendedSalePrice?: number
  extendedListPrice?: number
}

export type ProductOption = {
  __typename?: 'MultipleChoiceOption'
  id: string
  displayName: string
  values: ProductOptionValues[]
}

export type ProductOptionValues = {
  label: string
  hexColors?: string[]
}

export type ProductVariant = {
  id: string | number
  options: ProductOption[]
  availableForSale?: boolean
  price:number
  listPrice?:number
}

export type Product = {
  id: string
  name: string
  description: string
  descriptionHtml?: string
  sku?: string
  slug?: string
  path?: string
  images: ProductImage[]
  variants: ProductVariant[]
  price: ProductPrice
  options: ProductOption[]
  vendor?: string
  media?:  Video[];
}

export type SearchProductsBody = {
  search?: string
  categoryId?: string | number
  brandId?: string | number
  sort?: string
  locale?: string
}

export type ProductTypes = {
  product: Product
  searchBody: SearchProductsBody
}
export type SearchOrderHook<T extends OrderTypes = OrderTypes> = {
  data:{
    order: T['order'][]
    found: boolean
  }
}
export type SearchProductsHook<T extends ProductTypes = ProductTypes> = {
  data: {
    products: T['product'][]
    found: boolean
  }
  body: T['searchBody']
  input: T['searchBody']
  fetcherInput: T['searchBody']
}

export type ProductsSchema<T extends ProductTypes = ProductTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getProducts: SearchProductsHook<T>
    }
  }
}
export type OrderSchema<T extends OrderTypes = OrderTypes> = {
  endpoint:{
    options:{}
    handlers: {
      getOrder: SearchOrderHook<T>
    }
  }
}

export type GetAllProductPathsOperation<T extends ProductTypes = ProductTypes> =
  {
    data: { products: Pick<T['product'], 'path'>[] }
    variables: { first?: number }
  }

export type GetAllProductsOperation<T extends ProductTypes = ProductTypes> = {
  data: { products: T['product'][] }
  variables: {
    relevance?: 'featured' | 'best_selling' | 'newest'
    ids?: string[]
    first?: number
  }
}

export type OrderTypes = {
  order: Order
}
export type getOrderOperation<T extends OrderTypes = OrderTypes > = {
  data:{ order?: T['order'][] }
  variables:{id?: Number}
}

export type GetProductOperation<T extends ProductTypes = ProductTypes> = {
  data: { product?: T['product'] }
  variables: { path: string; slug?: never } | { path?: never; slug: string }
}
