import { expect, describe, it, beforeEach } from 'bun:test'
import { faker } from '@faker-js/faker'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { FetchProfileUseCase } from './fetch-profile'
import { UnauthorizadErro } from '../http/errors/unauthorized-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let sut: FetchProfileUseCase

describe('Fetch Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    sut = new FetchProfileUseCase(usersRepository)
  })

  it('should to fetch profile', async () => {
    const { user } = await createUserUseCase.execute({
      phone: faker.phone.number(),
      name: faker.person.fullName(),
      role: 'manager',
      email: faker.internet.email(),
    })

    const { profile } = await sut.execute({ id: user.id })

    expect(profile.id).toEqual(expect.any(String))
  })

  it('should not fetch profile', async () => {
    expect(
      sut.execute({
        id: '12345',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
