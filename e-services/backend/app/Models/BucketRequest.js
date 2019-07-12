'use strict'

const Model = use('Model')

class BucketRequest extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', 'BucketRequestHook.sendNewBucketRequestMail')
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
