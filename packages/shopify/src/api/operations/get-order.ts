import type {
    OperationContext,
    OperationOptions,
  } from '@vercel/commerce/api/operations'
  import { GetProductOperation, getOrderOperation } from '../../types/product'
  import { normalizeOrder, getOrderQuery } from '../../utils'
  import type { ShopifyConfig, Provider } from '..'
  import {
      getOrderByIdQuery,
    Order,
    Product as ShopifyProduct,
  } from '../../../schema'
  
  export default function getOrderOperation({
    commerce,
  }: OperationContext<Provider>) {
    async function getOrder<T extends getOrderOperation>(opts: {
        variables: T['variables']
        config?: Partial<ShopifyConfig>
        preview?: boolean
    }): Promise<T['data']>
    async function getOrder<T extends getOrderOperation>(opts: {
        variables: T['variables']
        config?: Partial<ShopifyConfig>
        preview?: boolean
    } & OperationOptions
    ): Promise<T['data']>

    async function getOrder<T extends getOrderOperation>({
        query = getOrderQuery,
        variables,
        config: cfg,
    }:{
        query?: string
        variables: T['variables']
        config?: Partial<ShopifyConfig>
        preview?: boolean
    }): Promise<T['data']> {

        const {fetch} = commerce.getConfig()

        const {
            data: { orderByHandle}
        } = await fetch<getOrderByIdQuery>(
            query,
            {
                variables,
            }
        )
        return {
            // ...(orderByHandle && {
            //     order: normalizeOrder(orderByHandle as unknown as Order)
            // })
            // @ts-ignore
            orderByHandle
        }
    }

    return getOrder
  }