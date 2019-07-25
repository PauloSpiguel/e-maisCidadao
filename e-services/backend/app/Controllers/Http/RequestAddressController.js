'use strict'

const RequestAddress = use('App/Models/RequestAddress')

class RequestAddressController {
  async index({ request }) {
    const address = RequestAddress.query()
      .with('user')
      .fetch()

    return address
  }

  async store({ request, auth }) {
    const { id } = auth.user
    const data = request.input('address')

    const address = await RequestAddress.create({ ...data, user_id: id })

    return address
  }

  async show({ params }) {
    const address = await RequestAddress.findOrFail(params.id)

    await address.load('user')

    return address
  }

  async update({ params, request, auth }) {
    const { id } = auth.user

    const address = await RequestAddress.findOrFail(params.id)
    const data = request.input('address')

    address.merge({ ...data, user_id: id })
    await address.save()

    await address.load('user')

    return address
  }

  async destroy({ params }) {
    const address = await RequestAddress.findOrFail(params.id)

    await address.delete()
  }
}

module.exports = RequestAddressController
