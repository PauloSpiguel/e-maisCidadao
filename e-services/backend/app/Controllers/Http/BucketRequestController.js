'use strict'
const moment = require('moment')

const BucketRequest = use('App/Models/BucketRequest')
const Persona = use('App/Models/Persona')
const Bucket = use('App/Models/Bucket')

class BucketRequestController {
  async index({ request, response }) {
    const bucketRequests = BucketRequest.all()

    return bucketRequests
  }

  async store({ request, response, auth }) {
    const { id } = auth.user
    const data = request.only([
      'persona',
      'cpf',
      'cellphone',
      'address',
      'trash_type',
      'number_bucket',
      'due_date',
      'priority'
    ])

    const persona = this.searchPerson(data, id)

    const bucket = this.searchBucket(data.number_bucket)

    const bucketRequest = BucketRequest.create({
      user_id: id,
      persona_id: persona.id,
      address: data.address,
      trash_type: data.trash_type,
      bucket_id: bucket.id,
      due_date: data.due_date,
      priority: data.priority,
      protocol: this.protocolGenerate()
    })

    return bucketRequest
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}

  async searchPerson({ data, id }) {
    const persona = await Persona.findByOrFail('cpf', data.cpf)

    if (!persona) {
      const newPersona = await Persona.create({
        user_id: id,
        name: data.persona,
        document: data.cpf,
        cellphone: data.cellphone,
        email: data.email
      })

      return newPersona
    }

    return persona
  }

  async searchBucket({ bucket }) {
    const bucketSearch = await Bucket.findByOrFail('number_bucket', bucket)

    return bucketSearch
  }

  protocolGenerate() {
    const dateNow = moment()
      .format('Y-MM-D h:mm:ss')
      .replace(/[\-\:\" "]/g, '')

    return dateNow
  }
}

module.exports = BucketRequestController
