import { expect, describe, it, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should to create user', async () => {
    const { user } = await sut.execute({
      phone: faker.phone.number(),
      name: faker.person.fullName(),
      role: 'manager',
      email: faker.internet.email(),
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
