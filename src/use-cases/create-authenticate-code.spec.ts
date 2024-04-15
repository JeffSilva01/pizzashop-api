import { expect, describe, it, beforeEach } from 'bun:test'
import { faker } from '@faker-js/faker'
import { CreateAuthenticateCodeUseCase } from './create-authenticate-code'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryAuthCodesRepository } from '../repositories/in-memory/in-memory-auth-codes-repository'
import { CreateUserUseCase } from './create-user'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let createUserUseCase: CreateUserUseCase

let usersRepository: InMemoryUsersRepository
let authLinksRepository: InMemoryAuthCodesRepository
let sut: CreateAuthenticateCodeUseCase

describe('Create Authenticate Code Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authLinksRepository = new InMemoryAuthCodesRepository()

    createUserUseCase = new CreateUserUseCase(usersRepository)

    sut = new CreateAuthenticateCodeUseCase(
      usersRepository,
      authLinksRepository,
    )
  })

  it('should create authenticate code', async () => {
    const email = faker.internet.email()

    await createUserUseCase.execute({
      name: faker.person.fullName(),
      email,
      role: 'manager',
      phone: faker.phone.number(),
    })

    const { code } = await sut.execute({ userEmail: email })

    expect(code).toEqual(expect.any(String))
  })

  it('should throw an error when user does not exist', async () => {
    expect(
      sut.execute({ userEmail: faker.internet.email() }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
