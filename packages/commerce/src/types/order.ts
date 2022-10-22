// @ts-ignore
import { Order } from '@vercel/commerce-shopify/schema.js'
export type OrderTypes = {
    order: Order
}


export type getOrderInfoOperation<T extends OrderTypes = OrderTypes > = {
    data:{ orderInfoByHandle?: T['order'][] }
    variables:{id?: Number}
  }

