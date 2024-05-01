type Filters = {
  customerName?: string
  orderId?: string
  status?: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
}

type FindManyResponse = {
  orders: {
    orderId: string
    createdAt: Date
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
    total: number
    customerName: string
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export interface OrdersRepository {
  findMany(
    restalrantId: string,
    pageIndex: number,
    filters?: Filters,
  ): Promise<FindManyResponse>
}
