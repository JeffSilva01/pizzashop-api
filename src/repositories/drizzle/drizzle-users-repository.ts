import { db } from '../../db/connection'
import { NewUser, users } from '../../db/schema'
import { UsersRepository } from '../users-repository'

export class DrizzleUsersRepository implements UsersRepository {
  async create({ email, phone, name, role }: NewUser) {
    const [user] = await db
      .insert(users)
      .values({
        email,
        phone,
        name,
        role,
      })
      .returning()

    return user
  }

  async findByEmail(email: string) {
    const user = await db.query.users.findFirst({
      where(filds, { eq }) {
        return eq(filds.email, email)
      },
    })

    return user || null
  }

  async findById(id: string) {
    const user = await db.query.users.findFirst({
      where(filds, { eq }) {
        return eq(filds.id, id)
      },
    })

    return user || null
  }
}
