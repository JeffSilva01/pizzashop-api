import { expect, describe, it, beforeEach } from 'bun:test'
import { faker } from '@faker-js/faker'

import { InMemoryRestaurantsRepository } from '../repositories/in-memory/in-memory-restaurant-repository'
import { CreateRestaurantUseCase } from './create-restaurant'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'

let userRepository: InMemoryUsersRepository
let restaurantRepository: InMemoryRestaurantsRepository
let sut: CreateRestaurantUseCase

describe('Create Restaurant Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    restaurantRepository = new InMemoryRestaurantsRepository()
    sut = new CreateRestaurantUseCase(restaurantRepository, userRepository)
  })

  it('should to restaurant user', async () => {
    const { restaurant } = await sut.execute({
      managerEmail: faker.internet.email(),
      managerName: faker.person.fullName(),
      restaurantName: faker.company.name(),
    })

    expect(restaurant.id).toEqual(expect.any(String))
    expect(restaurant.name).toEqual(expect.any(String))
    expect(restaurant.managerId).toEqual(expect.any(String))
  })
})
