'use strict'

const Model = use('Model')

class BucketRequest extends Model {
  static boot() {
    super.boot()

    this.addHook('afterCreate', 'BucketRequestHook.sendNewBucketRequestMail')
    this.addHook('beforeUpdate', 'BucketRequestHook.sendNewBucketRequestMail')
    // this.addHook('beforeUpdate', 'BucketRequestHook.personaCreateOrUpdate')
  }
  address() {
    return this.belongsTo('App/Models/Address')
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
