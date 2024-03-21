/* eslint-disable drizzle/enforce-delete-with-where */
import chalk from 'chalk'
import { faker } from '@faker-js/faker'
import { db } from './connection'
import { orderItems, orders, products, restaurants, users } from './schema'
import { createId } from '@paralleldrive/cuid2'

await db.delete(users)
await db.delete(restaurants)
await db.delete(orderItems)
await db.delete(orders)
await db.delete(products)

console.log(chalk.greenBright('✅ Databased reset!'))

const [customer1, customer2] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'customer',
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'customer',
    },
  ])
  .returning()

console.log(chalk.greenBright('✅ Created customers!'))

const [manager] = await db
  .insert(users)
  .values({
    name: faker.person.fullName(),
    email: 'jeffsilva01.dev@gmail.com',
    role: 'manager',
  })
  .returning({ id: users.id })

console.log(chalk.greenBright('✅ Created manager!'))

const [restaurant] = await db
  .insert(restaurants)
  .values({
    managerId: manager.id,
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
  })
  .returning()

console.log(chalk.greenBright('✅ Created restaurant!'))

function generateProducts() {
  return {
    name: faker.commerce.productName(),
    restaurantId: restaurant.id,
    description: faker.commerce.productDescription(),
    priceInCents: Number(faker.commerce.price({ min: 190, max: 490, dec: 0 })),
  }
}

const availableProducts = await db
  .insert(products)
  .values([
    generateProducts(),
    generateProducts(),
    generateProducts(),
    generateProducts(),
    generateProducts(),
    generateProducts(),
    generateProducts(),
    generateProducts(),
  ])
  .returning()

console.log(chalk.greenBright('✅ Created products!'))

type OrderItemsInsert = typeof orderItems.$inferInsert
type OrderInsert = typeof orders.$inferInsert

const orderItemsToPush: OrderItemsInsert[] = []
const ordersToPush: OrderInsert[] = []

for (let i = 0; i < 200; i++) {
  const orderId = createId()
  let totalInCents = 0
  const orderProducts = faker.helpers.arrayElements(availableProducts, {
    min: 1,
    max: 3,
  })

  orderProducts.forEach((orderProduct) => {
    const quantity = faker.number.int({ min: 1, max: 3 })
    totalInCents += orderProduct.priceInCents * quantity

    orderItemsToPush.push({
      orderId,
      quantity,
      productId: orderProduct.id,
      priceInCents: orderProduct.priceInCents,
    })
  })

  ordersToPush.push({
    id: orderId,
    customerId: faker.helpers.arrayElement([customer1.id, customer2.id]),
    restaurantId: restaurant.id,
    totalInCents,
    status: faker.helpers.arrayElement([
      'pending',
      'processing',
      'delivering',
      'delivered',
      'canceled',
    ]),
    createdAt: faker.date.recent({ days: 40 }),
  })
}

await db.insert(orders).values(ordersToPush)
await db.insert(orderItems).values(orderItemsToPush)

console.log(chalk.greenBright('✅ Created orders.'))

console.log(chalk.greenBright('✅ Database seeded successfully.'))

process.exit()
