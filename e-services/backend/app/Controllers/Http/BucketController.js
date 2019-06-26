'use strict'

const Bucket = use('App/Models/Bucket')

class BucketController {
  async index({ request, response }) {
    const buckets = await Bucket.all()

    return buckets
  }

  async store({ request, auth }) {
    const data = request.only(['number_bucket', 'description', 'conservation'])

    const bucket = await Bucket.create({ ...data, user_id: auth.user.id })

    return bucket
  }

  async show({ params }) {
    const bucket = await Bucket.findOrFail(params.id)

    await bucket.load('user')

    return bucket
  }

  async update({ params, request, auth }) {
    const bucket = await Bucket.findOrFail(params.id)
    const data = request.only(['number_bucket', 'description', 'conservation'])

    bucket.merge({ ...data, user_id: auth.user.id })
    bucket.save()

    return bucket
  }

  async destroy({ params, request, response }) {
    const bucket = await Bucket.findOrFail(params.id)

    bucket.delete()
  }
}

module.exports = BucketController
