'use strict'

const Model = use('Model')

class BucketRequest extends Model {
  static boot() {
    super.boot()

    this.addHook('afterCreate', 'BucketRequestHook.sendNewBucketRequestMail')
    this.addHook('beforeUpdate', 'BucketRequestHook.sendNewBucketRequestMail')
  }
  address() {
    return this.belongsTo('App/Models/RequestAddress')
  }
  user() {
    return this.belongsTo('App/Models/User')
  }
  persona() {
    return this.belongsTo('App/Models/Persona')
  }
  bucket() {
    return this.belongsTo('App/Models/Bucket')
  }
}

module.exports = BucketRequest
