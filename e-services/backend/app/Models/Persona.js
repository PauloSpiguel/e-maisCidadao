'use strict'

const Model = use('Model')

class Persona extends Model {
  // static boot() {
  //   super.boot()

  //   this.addHook('', 'PersonaHook.personaCreateOrUpdate')
  // }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Persona
