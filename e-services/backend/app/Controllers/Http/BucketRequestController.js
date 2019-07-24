'use strict'
const moment = require('moment')

const BucketRequest = use('App/Models/BucketRequest')
const Persona = use('App/Models/Persona')
const Bucket = use('App/Models/Bucket')
const Database = use('Database')
const Address = use('App/Models/RequestAddress')

class BucketRequestController {
  async index({ request }) {
    const { page } = request.get()

    const bucketRequests = BucketRequest.query()
      .with('user')
      .with('persona')
      .with('addresses')
      .paginate(page)

    return bucketRequests
  }

  async store({ request, response, auth }) {
    const { id } = auth.user
    const data = request.only([
      'persona',
      'document',
      'cellphone',
      'email',
      'trash_type',
      'number_bucket',
      'due_date',
      'priority',
      'observation'
    ])

    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    let persona = await Persona.findBy('document', data.document)

    if (!persona) {
      persona = await Persona.create(
        {
          user_id: id,
          name: data.persona,
          document: data.document,
          cellphone: data.cellphone,
          email: data.email
        },
        trx
      )
    }

    // const dueDate = moment()
    //   .add(data.due_date, 'days')
    //   .format('YYYY-MM-DD HH:mm:ss')

    const bucket = await Bucket.findByOrFail(
      'number_bucket',
      data.number_bucket
    )

    const address = await Address.create({ ...addresses, user_id: id }, trx)

    const bucketRequest = await BucketRequest.create(
      {
        user_id: id,
        persona_id: persona.id,
        address_id: address.id,
        bucket_id: bucket.id,
        trash_type: data.trash_type,
        due_date: this.dueData(data.due_date),
        priority: data.priority,
        observation: data.observation,
        protocol: this.protocolGenerate()
      },
      trx
    )

    await trx.commit()

    return bucketRequest
  }

  async show({ params }) {
    const bucketRequest = await BucketRequest.findOrFail(params.id)

    await bucketRequest.load('user')
    await bucketRequest.load('persona')
    await bucketRequest.load('addresses')
    await bucketRequest.load('bucket')

    return bucketRequest
  }

  async update({ params, request, auth }) {
    const bucketRequest = await BucketRequest.findOrFail(params.id)

    const data = request.only([
      'trash_type',
      // 'number_bucket',
      'due_date',
      'priority',
      'observation'
    ])

    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    // Pesquisa a caçamba pelo seu número
    // const bucket = await Bucket.findBy('number_bucket', data.number_bucket)

    bucketRequest.merge({
      trash_type: data.trash_type,
      // bucket_id: bucket.id,
      due_date: this.dueData(data.due_date),
      priority: data.priority,
      observation: data.observation,
      user_id: auth.user.id
    })

    await bucketRequest.save(trx)

    // if (addresses) {
    await bucketRequest.addresses().update(
      {
        street: addresses.street,
        number: addresses.number,
        district: addresses.district,
        city: addresses.city,
        state: addresses.state
      },
      trx
    )
    // await bucketRequest.addresses().update(addresses, trx)
    // }

    await trx.commit()

    await bucketRequest.load('addresses')

    return bucketRequest
  }

  async destroy({ params }) {
    const bucketRequest = await BucketRequest.findOrFail(params.id)

    await bucketRequest.delete()
  }

  async doneRequest({ params, request, auth }) {
    const bucketRequest = await BucketRequest.findOrFail(params.id)
    const doneRequest = request.only(['done_request', 'number_bucket'])

    const bucket = await Bucket.findBy(
      'number_bucket',
      doneRequest.number_bucket
    )

    bucketRequest.merge({
      done_request: doneRequest.done_request,
      bucket_id: bucket.id
    })
    await bucketRequest.save()

    return bucketRequest
  }

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
