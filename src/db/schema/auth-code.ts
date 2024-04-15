import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'

export const authCodes = pgTable('auth_codes', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  code: text('code').notNull().unique(),
  userId: text('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type AuthCode = typeof authCodes.$inferSelect // return type when queried
export type NewAuthCode = typeof authCodes.$inferInsert // insert type
