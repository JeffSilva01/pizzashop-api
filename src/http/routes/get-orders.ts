import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { UserIsNotManage } from '../../use-cases/errors/user-is-not-manage'
import { makeGetOrder } from '../../use-cases/factories/make-gate-order'

export const getOrders = new Elysia().use(auth).get(
  '/orders/:orderId',
  async ({ getCurrentUser, params }) => {
    const { restaurantId } = await getCurrentUser()
    const { orderId } = params

    if (!restaurantId) {
      throw new UserIsNotManage()
    }

    const getOrder = makeGetOrder()
    const { order } = await getOrder.execute({ orderId })

    return {
      order,
    }
  },
  {
    params: t.Object({
      orderId: t.String(),
    }),
  },
)
