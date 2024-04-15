import { createId } from '@paralleldrive/cuid2'
import { AuthCode, NewAuthCode } from '../../db/schema'
import { AuthCodesRepository } from '../auth-codes-repository'

export class InMemoryAuthCodesRepository implements AuthCodesRepository {
  public items: AuthCode[] = []

  async create({ id, code, userId }: NewAuthCode) {
    const authLink = {
      id: id || createId(),
      code,
      userId,
      createdAt: new Date(),
    }

    this.items.push(authLink)

    return authLink
  }

  async findByCode(code: string) {
    const authLink = this.items.find((item) => item.code === code)

    return authLink || null
  }

  async deleteById(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
