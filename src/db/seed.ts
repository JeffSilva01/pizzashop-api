/* eslint-disable drizzle/enforce-delete-with-where */
import chalk from 'chalk'
import { faker } from '@faker-js/faker'
import { db } from './connection'
import { restaurants, users } from './schema'

await db.delete(users)
await db.delete(restaurants)

console.log(chalk.greenBright('✅ Database reset!'))

await db.insert(users).values([
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

console.log(chalk.greenBright('✅ Create customers!'))

const [manager] = await db
  .insert(users)
  .values({
    name: faker.person.fullName(),
    email: 'jeffsilva01.dev@gmail.com',
    role: 'manager',
  })
  .returning({ id: users.id })

console.log(chalk.greenBright('✅ Create manager!'))

await db.insert(restaurants).values({
  managerId: manager.id,
  name: faker.company.name(),
  description: faker.lorem.paragraph(),
})

console.log(chalk.greenBright('✅ Create restaurant!'))

console.log(chalk.greenBright('✅ Database seeded successfully.'))

process.exit()
