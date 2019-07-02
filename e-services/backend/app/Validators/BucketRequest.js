'use strict'

const Antl = use('Antl')

class BucketRequest {
  get validateAll() {
    return true
  }
  get rules() {
    return {
      persona: 'required',
      document: 'required',
      cellphone: 'required',
      address: 'required'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = BucketRequest
