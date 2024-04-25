import dayjs from 'dayjs'
import { AuthCodesRepository } from '../repositories/auth-codes-repository'
import { RestaurantsRepository } from '../repositories/restaurants-repository'
import { UserIsNotManage } from './errors/user-is-not-manage'

type AuthenticateFromCodeUseCaseRequeste = {
  code: string
}

type AuthenticateFromCodeUseCaseResponse = {
  userId: string
  restaurantId: string
}

export class AuthenticateFromCodeUseCase {
  constructor(
    private authCodeRepository: AuthCodesRepository,
    private restaurantRepository: RestaurantsRepository,
  ) {}

  async execute({
    code,
  }: AuthenticateFromCodeUseCaseRequeste): Promise<AuthenticateFromCodeUseCaseResponse> {
    const authCode = await this.authCodeRepository.findByCode(code)

    if (!authCode) {
      throw new Error('Auth link not Found.')
    }

    const minutesSinceAuthLinkWasCreated = dayjs().diff(
      authCode.createdAt,
      'minutes',
    )

    await this.authCodeRepository.deleteById(authCode.id)

    if (minutesSinceAuthLinkWasCreated > 15) {
      throw new Error('Auth link expied, please generate a new one.')
    }

    const restaurant = await this.restaurantRepository.findByManagerId(
      authCode.userId,
    )

    if (!restaurant) {
      throw new UserIsNotManage()
    }

    return {
      userId: authCode.userId,
      restaurantId: restaurant.id,
    }
  }
}
