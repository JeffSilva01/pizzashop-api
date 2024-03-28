import type { User, NewUser } from '../db/schema/users'
export interface UsersRepository {
  create(data: NewUser): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
