'use strict'

const Model = use('Model')

class Persona extends Model {
  task() {
    return this.belongsTo('App/Models/Task')
  }
}

module.exports = Persona
