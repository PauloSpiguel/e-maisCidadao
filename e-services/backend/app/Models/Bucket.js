'use strict'

const Model = use('Model')

class Bucket extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Bucket
