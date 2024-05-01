import type { Order } from '../../db/schema'
import type { OrdersRepository } from '../orders-repository'
import { InMemoryUsersRepository } from './in-memory-users-repository'

type Filters = {
  customerName?: string
  orderId?: string
  status?: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
}

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async findMany(
    restaurantId: string,
    pageIndex: number = 0,
    filters?: Filters,
  ) {
    const usersRepository = new InMemoryUsersRepository()

    // Filtragem dos pedidos em memória
    const filteredOrders = this.items.filter(async (order) => {
      const customer = await usersRepository.findById(order.customerId || '')

      return (
        order.restaurantId === restaurantId &&
        (!filters || // Se não houver filtros, retorna true para incluir todos os pedidos
          ((!filters.orderId || order.id === filters.orderId) &&
            (!filters.status || order.status === filters.status) &&
            (!filters.customerName ||
              customer?.name.includes(filters.customerName))))
      )
    })

    // Ordenação dos pedidos conforme requisitado
    filteredOrders.sort((a, b) => {
      if (a.status !== b.status) {
        const statusOrder = {
          pending: 1,
          processing: 2,
          delivering: 3,
          delivered: 4,
          canceled: 99,
        }
        return statusOrder[a.status] - statusOrder[b.status]
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    // Paginação dos pedidos
    const startIndex = pageIndex * 10
    const paginatedOrders = filteredOrders
      .slice(startIndex, startIndex + 10)
      .map((order) => ({
        orderId: order.id,
        createdAt: order.createdAt,
        status: order.status,
        total: order.totalInCents,
        customerName: '',
      }))

    return {
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    }
  }
}
