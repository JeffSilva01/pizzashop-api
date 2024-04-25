import { eq } from 'drizzle-orm'
import { db } from '../../db/connection'
import { NewAuthCode, authCodes } from '../../db/schema'
import { AuthCodesRepository } from '../auth-codes-repository'

export class DrizzleAuthCodesRepository implements AuthCodesRepository {
  async create({ code, userId }: NewAuthCode) {
    const [authLink] = await db
      .insert(authCodes)
      .values({
        code,
        userId,
      })
      .returning()

    return authLink
  }

  async findByCode(code: string) {
    const authLink = await db.query.authCodes.findFirst({
      where: (authLink, { eq }) => eq(authLink.code, code),
    })

    return authLink || null
  }

  async deleteById(id: string) {
    await db.delete(authCodes).where(eq(authCodes.id, id))
  }
}
