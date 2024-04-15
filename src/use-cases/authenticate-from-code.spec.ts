import { expect, describe, it, beforeEach } from 'bun:test'
import { AuthenticateFromCodeUseCase } from './authenticate-from-code'
import { InMemoryAuthCodesRepository } from '../repositories/in-memory/in-memory-auth-codes-repository'
import { InMemoryRestaurantsRepository } from '../repositories/in-memory/in-memory-restaurant-repository'
import { CreateAuthenticateCodeUseCase } from './create-authenticate-code'
import { CreateRestaurantUseCase } from './create-restaurant'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { faker } from '@faker-js/faker'
import { GetUserUseCase } from './get-user'

let usersRepository: InMemoryUsersRepository
let restaurantsRepository: InMemoryRestaurantsRepository
let authCodesRepository: InMemoryAuthCodesRepository

let getUserUseCase: GetUserUseCase
let createRestaurantUseCase: CreateRestaurantUseCase
let createAuthenticateCodeUseCase: CreateAuthenticateCodeUseCase
let sut: AuthenticateFromCodeUseCase

describe('Create Authenticate Code Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    restaurantsRepository = new InMemoryRestaurantsRepository()
    authCodesRepository = new InMemoryAuthCodesRepository()

    getUserUseCase = new GetUserUseCase(usersRepository)

    createRestaurantUseCase = new CreateRestaurantUseCase(
      restaurantsRepository,
      usersRepository,
    )

    createAuthenticateCodeUseCase = new CreateAuthenticateCodeUseCase(
      usersRepository,
      authCodesRepository,
    )

    sut = new AuthenticateFromCodeUseCase(
      authCodesRepository,
      restaurantsRepository,
    )
  })

  it('should create authenticate code', async () => {
    const { restaurant } = await createRestaurantUseCase.execute({
      managerName: faker.person.fullName(),
      managerEmail: faker.internet.email(),
      restaurantName: faker.company.name(),
    })

    const { user } = await getUserUseCase.execute({
      id: restaurant.managerId as string,
    })

    const { code } = await createAuthenticateCodeUseCase.execute({
      userEmail: user.email,
    })

    const { userId, restaurantId } = await sut.execute({ code })

    expect(userId).toEqual(expect.any(String))
    expect(restaurantId).toEqual(expect.any(String))
  })
})
