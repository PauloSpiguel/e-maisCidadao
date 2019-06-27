'use strict'
const moment = require('moment')

const BucketRequest = use('App/Models/BucketRequest')
const Persona = use('App/Models/Persona')
const Bucket = use('App/Models/Bucket')

class BucketRequestController {
  async index({ request, response }) {
    const bucketRequests = BucketRequest.query()
      .with('user')
      .with('persona')
      .fetch()

    return bucketRequests
  }

  async store({ request, response, auth }) {
    const { id } = auth.user
    const data = request.only([
      'persona',
      'document',
      'cellphone',
      'email',
      'address',
      'trash_type',
      'number_bucket',
      'due_date',
      'priority'
    ])

    let persona = await Persona.findBy('document', data.document)

    if (!persona) {
      persona = await Persona.create({
        user_id: id,
        name: data.persona,
        document: data.document,
        cellphone: data.cellphone,
        email: data.email
      })
    }

    // const dueDate = moment()
    //   .add(data.due_date, 'days')
    //   .format('YYYY-MM-DD HH:mm:ss')

    const bucket = await Bucket.findByOrFail(
      'number_bucket',
      data.number_bucket
    )

    const bucketRequest = BucketRequest.create({
      user_id: id,
      persona_id: persona.id,
      address: data.address,
      trash_type: data.trash_type,
      bucket_id: bucket.id,
      due_date: this.dueData(data.due_date),
      priority: data.priority,
      protocol: this.protocolGenerate()
    })

    return bucketRequest
  }

  async show({ params }) {
    const bucketRequest = await BucketRequest.findOrFail(params.id)

    await bucketRequest.load('user')
    await bucketRequest.load('persona')

    return bucketRequest
  }

  async update({ params, request, auth }) {
    const bucketRequest = await BucketRequest.findOrFail(params.id)
    const data = request.only([
      'address',
      'trash_type',
      'number_bucket',
      'due_date',
      'done_request'
    ])

    const bucket = await Bucket.findBy('number_bucket', data.number_bucket)

    bucketRequest.merge({
      address: data.address,
      trash_type: data.trash_type,
      bucket_id: bucket.id,
      due_date: this.dueData(data.due_date),
      user_id: auth.user.id,
      done_request: data.done_request
    })

    await bucketRequest.save()

    return bucketRequest
  }

  async destroy({ params, request, response }) {}

  protocolGenerate() {
    const dateNow = moment()
      .format('Y-MM-D h:mm:ss')
      .replace(/[\-\:\" "]/g, '')

    return dateNow
  }

  dueData(due) {
    const dueDate = moment()
      .add(due, 'days')
      .format('YYYY-MM-DD HH:mm:ss')

    return dueDate
  }
}

module.exports = BucketRequestController
