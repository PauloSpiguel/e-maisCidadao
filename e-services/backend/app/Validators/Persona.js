'use strict'

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
}

module.exports = Persona
