import { AuthCode, NewAuthCode } from '../db/schema'

export interface AuthCodesRepository {
  create(data: NewAuthCode): Promise<AuthCode | null>
  findByCode(code: string): Promise<AuthCode | null>
  deleteById(id: string): Promise<void>
}
