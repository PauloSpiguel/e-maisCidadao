'use strict'

const Service = use('App/Models/Service')

/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  async index({ request, response }) {
    const services = await Service.query()
      .with('user')
      .fetch()

    return services
  }

  async store({ request, response, auth }) {
    const data = request.only(['title', 'description', 'priority'])

    const service = await Service.create({ ...data, user_id: auth.user.id })

    return service
  }

  async show({ params }) {
    const service = await Service.findOrFail(params.id)

    await service.load('user')
    await service.load('tasks')

    return service
  }

  async update({ params, request }) {
    const service = await Service.findOrFail(params.id)
    const data = request.only(['title', 'description', 'priority'])
    service.merge(data)

    await service.save()

    return service
  }

  async destroy({ params }) {
    const service = await Service.findOrFail(params.id)

    await service.delete()
  }
}

module.exports = ServiceController
