'use strict'

const Address = use('App/Models/RequestAddress')

class RequestAddressController {
  async index({ request, response }) {
    const address = await Address.query()
      .with('user')
      .fetch()

    return address
  }
}

module.exports = RequestAddressController
