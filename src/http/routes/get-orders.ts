import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { UserIsNotManage } from '../../use-cases/errors/user-is-not-manage'
import { makeFetchOrdersDetails } from '../../use-cases/factories/make-fetch-orders-details'
import { createSelectSchema } from 'drizzle-typebox'
import { orders } from '../../db/schema'

export const getOrders = new Elysia().use(auth).get(
  '/orders',
  async ({ getCurrentUser, query }) => {
    const { restaurantId } = await getCurrentUser()
    const { pageIndex, status, orderId, customerName } = query

    if (!restaurantId) {
      throw new UserIsNotManage()
    }

    const getRestaurant = makeFetchOrdersDetails()
    const { orders, meta } = await getRestaurant.execute({
      restaurantId,
      pageIndex,
      filters: {
        status,
        customerName,
        orderId,
      },
    })

    return {
      orders,
      meta,
    }
  },
  {
    query: t.Object({
      customerName: t.Optional(t.String()),
      orderId: t.Optional(t.String()),
      status: t.Optional(createSelectSchema(orders).properties.status),
      pageIndex: t.Numeric({ minimum: 0 }),
    }),
  },
)
