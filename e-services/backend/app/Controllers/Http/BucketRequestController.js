'use strict'

const BucketRequest = use('App/Models/BucketRequest')
const Persona = use('App/Models/Persona')

class BucketRequestController {
  async index({ request, response }) {
    const bucketRequests = BucketRequest.all()

    return bucketRequests
  }

  async store({ request, response, auth }) {
    const { id } = auth.user
    const data = BucketRequest.only([
      'persona',
      'cpf',
      'cellphone',
      'address',
      'trash_type',
      'number_bucket',
      'due_date',
      'priority'
    ])

    const persona = await Persona.create({})
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}

  async searchPerson({ data }) {
    const persona = await Persona.findByOrFail('cpf', data.cpf)

    if (!persona) {
      const newPersona = await Persona.create({
        name: data.persona,
        document: data.cpf,
        cellphone: data.cellphone
      })
    }
  }
}

module.exports = BucketRequestController
