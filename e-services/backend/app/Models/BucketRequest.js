'use strict'

const Model = use('Model')

class BucketRequest extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
  bucket() {
    return this.belongsTo('App/Models/Bucket')
  }
}

module.exports = BucketRequest
