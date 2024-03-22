import { createId } from '@paralleldrive/cuid2'
import { NewUser, User } from '../../db/schema'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create({ email, phone, name, role }: NewUser) {
    const user = {
      id: createId(),
      email,
      phone: phone || null,
      name,
      role: role || 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}
