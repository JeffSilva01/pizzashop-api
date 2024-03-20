import { createId } from '@paralleldrive/cuid2'
import { integer, text, timestamp, pgTable, pgEnum } from 'drizzle-orm/pg-core'
import { restaurants } from './restaurants'
import { users } from './users'

export const orderIstatusEnun = pgEnum('order_status', [
  'pending',
  'processing',
  'delivering',
  'delivered',
  'canceled',
])

export const orders = pgTable('orders', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  customerId: text('customer_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'set null',
    }),
  restaurantId: text('restaurant_id')
    .notNull()
    .references(() => restaurants.id, {
      onDelete: 'cascade',
    }),
  status: orderIstatusEnun('status').default('pending').notNull(),
  totalInCents: integer('total_in_cents').notNull(),
  comments: text('comments').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
