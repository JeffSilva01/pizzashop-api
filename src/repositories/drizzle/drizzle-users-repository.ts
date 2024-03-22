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
}
