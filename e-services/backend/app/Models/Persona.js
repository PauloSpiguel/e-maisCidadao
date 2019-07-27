'use strict'

const Model = use('Model')

class Persona extends Model {
  // static boot() {
  //   super.boot()

  //   // this.addHook('beforeUpdate', 'PersonaHook.personaCreateOrUpdate')
  //   this.addHook('beforeSave', 'PersonaHook.personaCreateOrUpdate')
  // }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Persona
