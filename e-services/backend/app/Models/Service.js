'use strict'

const Model = use('Model')

class Service extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  tasks() {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Service
