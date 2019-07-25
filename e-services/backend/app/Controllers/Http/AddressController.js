'use strict'

const Address = use('App/Models/Address')

class AddressController {
  async index({ request }) {
    const address = Address.query()
      .with('user')
      .fetch()

    return address
  }

  async store({ request, auth }) {
    const { id } = auth.user
    const data = request.input('address')

    const address = await Address.create({ ...data, user_id: id })

    return address
  }

  async show({ params }) {
    const address = await Address.findOrFail(params.id)

    await address.load('user')

    return address
  }

  async update({ params, request, auth }) {
    const { id } = auth.user

    const address = await Address.findOrFail(params.id)
    const data = request.input('address')

    address.merge({ ...data, user_id: id })
    await address.save()

    await address.load('user')

    return address
  }

  async destroy({ params }) {
    const address = await Address.findOrFail(params.id)

    await address.delete()
  }
}

module.exports = AddressController
