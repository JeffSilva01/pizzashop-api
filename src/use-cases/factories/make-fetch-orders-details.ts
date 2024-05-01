import { DrizzleOrdersRepository } from '../../repositories/drizzle/drizzle-orders-repository'
import { FetchOrdersDetailsPaginatedUseCase } from '../fetch-orders-details'

export function makeFetchOrdersDetails() {
  const ordersRepository = new DrizzleOrdersRepository()
  const useCase = new FetchOrdersDetailsPaginatedUseCase(ordersRepository)

  return useCase
}
