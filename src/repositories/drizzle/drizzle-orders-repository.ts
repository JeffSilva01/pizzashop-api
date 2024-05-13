import { db } from '../../db/connection'
import { NewOrder, orders, users } from '../../db/schema'
import { OrdersRepository } from '../orders-repository'
import { eq, and, ilike, count, desc, sql } from 'drizzle-orm'

type Filters = {
  customerName?: string
  orderId?: string
  status?: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
}

export class DrizzleOrdersRepository implements OrdersRepository {
  async create({ restaurantId, totalInCents, comments, customerId }: NewOrder) {
    const [order] = await db
      .insert(orders)
      .values({
        restaurantId,
        totalInCents,
        comments,
        customerId,
      })
      .returning()

    return order
  }

  async findById(id: string) {
    const order = await db.query.orders.findFirst({
      where(filds, { eq }) {
        return eq(filds.id, id)
      },
    })

    return order || null
  }

  async findMany(
    restaurantId: string,
    pageIndex: number = 0,
    filters?: Filters,
  ) {
    const baseQuery = db
      .select({
        orderId: orders.id,
        createdAt: orders.createdAt,
        status: orders.status,
        total: orders.totalInCents,
        customerName: users.name,
      })
      .from(orders)
      .innerJoin(users, eq(users.id, orders.customerId))
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          filters?.orderId ? eq(orders.id, filters.orderId) : undefined,
          filters?.status ? eq(orders.status, filters.status) : undefined,
          filters?.customerName
            ? ilike(users.name, `%${filters?.customerName}%`)
            : undefined,
        ),
      )
    const [[{ count: amountOfOrders }], allOrders] = await Promise.all([
      db.select({ count: count() }).from(baseQuery.as('baseQuery')),
      db
        .select()
        .from(baseQuery.as('baseQuery'))
        .offset(pageIndex * 10)
        .limit(10)
        .orderBy((filds) => {
          return [
            sql`CASE ${filds.status}
              WHEN 'pending'    THEN 1
              WHEN 'processing' THEN 2
              WHEN 'delivering' THEN 3
              WHEN 'delivered'  THEN 4
              WHEN 'canceled'   THEN 99
            END`,
            desc(filds.createdAt),
          ]
        }),
    ])
    return {
      orders: allOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: amountOfOrders,
      },
    }
  }
}
