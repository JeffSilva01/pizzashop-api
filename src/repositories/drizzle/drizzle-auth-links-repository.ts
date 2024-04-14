import { db } from '../../db/connection'
import { NewAuthLink, authLinks } from '../../db/schema'
import { AuthLinksRepository } from '../auth-links-repository'

export class DrizzleAuthLinksRepository implements AuthLinksRepository {
  async create({ code, userId }: NewAuthLink) {
    const [authLink] = await db
      .insert(authLinks)
      .values({
        code,
        userId,
      })
      .returning()

    return authLink
  }

  async findByCode(code: string) {
    const authLink = await db.query.authLinks.findFirst({
      where: (authLink, { eq }) => eq(authLink.code, code),
    })

    return authLink || null
  }
}
