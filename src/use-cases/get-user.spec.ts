import { expect, describe, it, beforeEach } from 'bun:test'
import { faker } from '@faker-js/faker'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { GetUserUseCase } from './get-user'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let sut: GetUserUseCase

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    sut = new GetUserUseCase(usersRepository)
  })

  it('should get a profile', async () => {
    const { user: newUser } = await createUserUseCase.execute({
      phone: faker.phone.number(),
      name: faker.person.fullName(),
      role: 'manager',
      email: faker.internet.email(),
    })

    const { user } = await sut.execute({ id: newUser.id })

    expect(user.id).toEqual(expect.any(String))
  })
})
