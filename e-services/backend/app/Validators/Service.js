'use strict'

class Service {
  get validateAll() {
    return true
  }
  get rules() {
    return {
      description: 'required'
    }
  }
}

module.exports = Service
