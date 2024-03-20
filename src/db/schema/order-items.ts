import { createId } from '@paralleldrive/cuid2'
import { text, integer, pgTable } from 'drizzle-orm/pg-core'
import { users } from './users'
import { orders } from './orders'

export const orderItems = pgTable('orderItems', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, {
      onDelete: 'cascade',
    }),
  productId: text('product_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'set null',
    }),
  priceInCentes: integer('price_in_centes').notNull(),
  quantity: integer('quantity').default(1).notNull(),
})
