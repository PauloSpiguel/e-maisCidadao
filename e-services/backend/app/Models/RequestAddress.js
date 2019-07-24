'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RequestAddress extends Model {
  user() {
    return this.hasMany('App/Models/User')
  }
  bucketRequest() {
    return this.hasMany('App/Models/BucketRequest')
  }
}

module.exports = RequestAddress
