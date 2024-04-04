import { expect, describe, it, beforeEach } from 'bun:test'
import { faker } from '@faker-js/faker'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryRestaurantsRepository } from '../repositories/in-memory/in-memory-restaurant-repository'
import { FetchRestaurantManaged } from './fetch-restaurant-managed'
import { CreateRestaurantUseCase } from './create-restaurant'

let restaurantRepository: InMemoryRestaurantsRepository
let userRpository: InMemoryUsersRepository
let createRestauranteUseCase: CreateRestaurantUseCase
let sut: FetchRestaurantManaged

describe('Fetch Restaurant Managed Use Case', () => {
  beforeEach(() => {
    restaurantRepository = new InMemoryRestaurantsRepository()
    userRpository = new InMemoryUsersRepository()
    createRestauranteUseCase = new CreateRestaurantUseCase(
      restaurantRepository,
      userRpository,
    )
    sut = new FetchRestaurantManaged(restaurantRepository)
  })

  it('should to fetch restaurant', async () => {
    const { restaurant: newRestaurant } =
      await createRestauranteUseCase.execute({
        managerEmail: faker.internet.email(),
        managerName: faker.person.fullName(),
        restaurantName: faker.company.name(),
      })

    const { restaurant } = await sut.execute({ restaurantId: newRestaurant.id })

    expect(restaurant.id).toEqual(expect.any(String))
  })
})
