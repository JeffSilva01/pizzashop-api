import { Elysia, t } from 'elysia'
import { makeCreateRestaurant } from '../../use-cases/factories/make-create-restaurant'
import { UserAlreadyExistsError } from '../../use-cases/errors/user-already-exists-error'

export const registerRestaurants = new Elysia().post(
  '/restaurants',
  async ({ body, set }) => {
    const { restaurantName, managerName, email, description, phone } = body

    try {
      const createRestaurantUseCase = makeCreateRestaurant()
      await createRestaurantUseCase.execute({
        restaurantName,
        userName: managerName,
        userEmail: email,
        restaurantDescription: description,
        userPhone: phone,
      })

      set.status = 204
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        set.status = 409

        return {
          message: error.message,
        }
      }
      throw error
    }
  },
  {
    body: t.Object({
      restaurantName: t.String(),
      managerName: t.String(),
      email: t.String({ format: 'email' }),
      description: t.Optional(t.String()),
      phone: t.String(),
    }),
  },
)
