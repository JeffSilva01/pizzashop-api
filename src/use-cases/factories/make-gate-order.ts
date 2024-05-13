import { DrizzleOrdersRepository } from '../../repositories/drizzle/drizzle-orders-repository'
import { GetOrderUseCase } from '../get-order'

export function makeGetOrder() {
  const orderRepository = new DrizzleOrdersRepository()
  const useCase = new GetOrderUseCase(orderRepository)

  return useCase
}
