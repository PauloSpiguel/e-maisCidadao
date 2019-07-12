'use strict'

const Antl = use('Antl')

class Persona {
  get validateAll() {
    return true
  }
  get rules() {
    return {
      name: 'required',
      document: 'required',
      cellphone: 'required'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Persona
