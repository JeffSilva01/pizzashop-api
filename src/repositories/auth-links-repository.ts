import { AuthLink, NewAuthLink } from '../db/schema'

export interface AuthLinksRepository {
  create(data: NewAuthLink): Promise<AuthLink | null>
  findByCode(code: string): Promise<AuthLink | null>
}
