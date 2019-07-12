'use strict'

const Antl = use('Antl')

class Service {
  get validateAll() {
    return true
  }
  get rules() {
    return {
      description: 'required'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Service
