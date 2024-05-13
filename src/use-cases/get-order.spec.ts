import { expect, describe, it, beforeEach } from 'bun:test'

import { GetOrderUseCase } from './get-order'
import { InMemoryOrdersRepository } from '../repositories/in-memory/in-memory-orders-repository'
import { InMemoryRestaurantsRepository } from '../repositories/in-memory/in-memory-restaurant-repository'
import { faker } from '@faker-js/faker'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'

let restaurantRepository: InMemoryRestaurantsRepository
let userRepository: InMemoryUsersRepository
let orderRepository: InMemoryOrdersRepository
let sut: GetOrderUseCase

describe('Get Order  Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    restaurantRepository = new InMemoryRestaurantsRepository()
    orderRepository = new InMemoryOrdersRepository()
    sut = new GetOrderUseCase(orderRepository)
  })

  it('should be able to get order', async () => {
    const manager = await userRepository.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    })

    const restaurant = await restaurantRepository.create({
      name: faker.company.name(),
      managerId: manager.id,
    })

    const user = await userRepository.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    })

    const newOrder = await orderRepository.create({
      restaurantId: restaurant.id,
      customerId: user.id,
      totalInCents: 1000,
    })

    const { order } = await sut.execute({
      orderId: newOrder.id,
    })

    expect(order.id).toEqual(newOrder.id)
    expect(order.restaurantId).toEqual(restaurant.id)
    expect(order.customerId).toEqual(user.id)
  })
})
