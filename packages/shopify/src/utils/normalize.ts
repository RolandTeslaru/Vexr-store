import type { Page } from '../types/page'
import type { Product } from '../types/product'
import type { Cart, LineItem } from '../types/cart'
import type { Category } from '../types/site'

import {
  Product as ShopifyProduct,
  MediaConnection,
  Checkout,
  CheckoutLineItemEdge,
  SelectedOption,
  ImageConnection,
  ProductVariantConnection,
  MoneyV2,
  ProductOption,
  Page as ShopifyPage,
  PageEdge,
  Collection,
  VideoSource,
  Order,
} from '../../schema'
import { colorMap } from './colors'
import { height, width } from '@mui/system'
import { indexOf } from 'lodash'

const money = ({ amount, currencyCode }: MoneyV2) => {
  return {
    value: +amount,
    currencyCode,
  }
}

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges?.map(
    ({
      node: {
        id,
        selectedOptions,
        sku,
        title,
        priceV2,
        compareAtPriceV2,
        requiresShipping,
        availableForSale,
      },
    }) => {
      return {
        id,
        name: title,
        sku: sku ?? id,
        price: +priceV2.amount,
        listPrice: +compareAtPriceV2?.amount,
        requiresShipping,
        availableForSale,
        options: selectedOptions.map(({ name, value }: SelectedOption) => {
          const options = normalizeProductOption({
            id,
            name,
            values: [value],
          })
          return options
        }),
      }
    }
    )
  }
  const normalizeProductOption = ({
    id,
    name: displayName,
    values,
  }: ProductOption) => {
    return {
      __typename: 'MultipleChoiceOption',
      id,
      displayName: displayName.toLowerCase(),
      values: values.map((value) => {
        let output: any = {
          label: value,
        }
        if (displayName.match(/colou?r/gi)) {
          const mapedColor = colorMap[value.toLowerCase().replace(/ /g, '')]
          if (mapedColor) {
            output = {
              ...output,
              hexColors: [mapedColor],
            }
          }
        }
        return output
      }),
    }
  }
  interface VideoType {
    id: string,
    width: number,
    format: string
  }

  const normalizeProductMedia = ({edges}: MediaConnection) => {       
    return edges == null ? void 0 : edges.filter((edge) => {
      return Object.keys(edge.node).length !== 0 
    }).map(({
      node:{
        id,
        mediaContentType,
        sources
      }
    }) => {
      return{
        id,
        mediaContentType,
        sources: sources.map(({
          height, 
          width , 
          mimeType , 
          format, 
          url
        }) => {
          let output:any  = {
            height,
            width,
            mimeType,
            format,
            url,
          }
          return output
        })
      }
    })

    }

const normalizeProductImages = ({ edges }: ImageConnection) =>
  edges?.map(({ node: { originalSrc: url, ...rest } }) => ({
    url,
    ...rest,
  }))


export function normalizeProduct({
  id,
  title: name,
  vendor,
  images,
  variants,
  description,
  descriptionHtml,
  handle,
  priceRange,
  options,
  metafields,
  media,
  ...rest
}: ShopifyProduct): Product {
  console.log("media " + JSON.stringify(media));
  return {
    id,
    name,
    vendor,

    path: `/${handle}`,
    slug: handle?.replace(/^\/+|\/+$/g, ''),
    price: money(priceRange?.minVariantPrice),
    images: normalizeProductImages(images),
    media: media ? normalizeProductMedia(media) : [],
    variants: variants ? normalizeProductVariants(variants) : [],
    options: options
      ? options
          .filter((o) => o.name !== 'Title') // By default Shopify adds a 'Title' name when there's only one option. We don't need it. https://community.shopify.com/c/Shopify-APIs-SDKs/Adding-new-product-variant-is-automatically-adding-quot-Default/td-p/358095
          .map((o) => normalizeProductOption(o))
      : [],
    ...(description && { description }),
    ...(descriptionHtml && { descriptionHtml }),
    ...rest,
  }
}

export function normalizeOrder(order: Order) {
  console.log("THIS ORDER " + JSON.stringify(order))
}

export function normalizeCart(checkout: Checkout): Cart {
  return {
    id: checkout.id,
    url: checkout.webUrl,
    customerId: '',
    email: '',
    createdAt: checkout.createdAt,
    currency: {
      code: checkout.totalPriceV2?.currencyCode,
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItems: checkout.lineItems?.edges.map(normalizeLineItem),
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2?.amount,
    subtotalPrice: +checkout.subtotalPriceV2?.amount,
    totalPrice: checkout.totalPriceV2?.amount,
    discounts: [],
  }
}

function normalizeLineItem({
  node: { id, title, variant, quantity },
}: CheckoutLineItemEdge): LineItem {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: `${title}`,
    quantity,
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? '',
      name: variant?.title!,
      image: {
        url: variant?.image?.originalSrc || '/product-img-placeholder.svg',
      },
      requiresShipping: variant?.requiresShipping ?? false,
      price: variant?.priceV2?.amount,
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    path: String(variant?.product?.handle),
    discounts: [],
    options: variant?.title == 'Default Title' ? [] : variant?.selectedOptions,
  }
}

export const normalizePage = (
  { title: name, handle, ...page }: ShopifyPage,
  locale: string = 'en-US'
): Page => ({
  ...page,
  url: `/${locale}/${handle}`,
  name,
})

export const normalizePages = (edges: PageEdge[], locale?: string): Page[] =>
  edges?.map((edge) => normalizePage(edge.node, locale))

export const normalizeCategory = ({
  title: name,
  handle,
  id,
}: Collection): Category => ({
  id,
  name,
  slug: handle,
  path: `/${handle}`,
})
