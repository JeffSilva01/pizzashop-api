import { createId } from '@paralleldrive/cuid2'
import { AuthLink, NewAuthLink } from '../../db/schema'
import { AuthLinksRepository } from '../auth-links-repository'

export class InMemoryAuthLinksRepository implements AuthLinksRepository {
  public items: AuthLink[] = []

  async create({ id, code, userId }: NewAuthLink) {
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
}
